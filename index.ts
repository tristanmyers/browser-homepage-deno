#!/usr/bin/env deno
import { http, parse, Args, DB } from './deps.ts';
import { rootHandler } from './controllers/rootHandler.ts';

type ResponseData = {
	body: BodyInit;
	status: number;
	contentType: string;
};

export type DenoArguments = {
	testing: boolean;
	release: boolean;
}

const port = 8081;
const stylesDir = './public/styles/';

export const args: Args<DenoArguments> = parse(Deno.args);
export const db = args.testing ? new DB('testing.db') : new DB('main.db');

http.serve(handler, { port });

async function handler(req: Request): Promise<Response> {
	// Have to always set body and status or else a 500 happens.
	const resData: ResponseData = {
		body: 'Internal server error',
		status: 500,
		contentType: 'text/html',
	};

	const reqUrl = new URL(req.url);

	switch (reqUrl.pathname) {
		case '/': {
			const data = await rootHandler(req, 1);
			if (data) {
				resData.body = data;
				resData.status = 200;
			}
			break;
		}

		default:
			resData.body = 'Page not found';
			resData.status = 404;
			break;
	}

	// BUG: Currently does not work with multiple css files.
	// This serves the static files
	if (reqUrl.pathname.startsWith('/public/')) {
		const styleFiles = Deno.readDir(stylesDir);

		for await (const file of styleFiles) {
			return new Response(await Deno.readFile(stylesDir + file.name), {
				headers: {
					'content-type': 'text/css',
				},
			});
		}
	}

	db.close();
	return new Response(resData.body, {
		status: resData.status,
		headers: {
			'content-type': resData.contentType,
		},
	});
}
