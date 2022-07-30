import { serve } from 'http/server.ts';
import { renderToString } from 'preact';

import { app } from './views/app.tsx';

type ResponseData = {
	body: BodyInit;
	status: number;
	contentType: string;
};

const port = 8000;
const stylesDir = './public/styles/';

await serve(handler, { port });

function handler(req: Request): Response {
	const resData: ResponseData = {
		body: 'Internal server error',
		status: 500,
		contentType: 'text/html',
	};

	const reqUrl = new URL(req.url);

	switch (reqUrl.pathname) {
		case '/':
			if (req.method === 'GET') {
				resData.body = renderToString(app());
				resData.status = 200;
			}
			break;

		default:
			resData.body = 'Page not found';
			resData.status = 404;
			break;
	}

	// This serves the static files
	// TODO: Currently does not work with multiple css files.
	if (reqUrl.pathname.startsWith('/public/')) {
		const styleFiles = Deno.readDirSync(stylesDir);

		for (const file of styleFiles) {
			Deno.readFileSync(stylesDir + file.name);
			return new Response(Deno.readFileSync(stylesDir + file.name), {
				headers: {
					'content-type': 'text/css',
				},
			});
		}
	}

	return new Response(resData.body, {
		status: resData.status,
		headers: {
			'content-type': resData.contentType,
		},
	});
}
