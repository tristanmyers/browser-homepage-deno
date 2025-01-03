#!/usr/bin/env deno
import { DB } from 'sqlite';
import { rootHandler } from './controllers/rootHandler.ts';
import { type Args, parse } from '@std/flags';
import { addLinks, removeLinks } from './models/updateLinks.ts';
import { loginHandler } from './controllers/loginHandler.ts';
import addUser from "./models/addUser.ts";
import {realUser, testingUser} from "./data/user.ts";

type ResponseData = {
	body: BodyInit;
	status: number;
	contentType: string;
};

export type DenoArguments = {
	testing: boolean;
	release: boolean;
};

const port = 8081;
const stylesDir = './public/styles/';

export let envVars: string;

if (Deno.env.has("ENV_TYPE")) {
	envVars = Deno.env.get("ENV_TYPE") || "development";
} else {
	console.warn("No environment variables: ENV_TYPE has not been set");
	console.warn("setting to development environment");
	envVars = "development";
}

Deno.serve({ port }, handler);

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
			const db = createDB(envVars);
			const data = await rootHandler(req, 1, db);
			if (data) {
				resData.body = data;
				resData.status = 200;
			}
			db.close();
			break;
		}

		case '/api/addLink': {
			const db = createDB(envVars);
			//TODO: get links from request body
			const links = ['placeholder.com'];
			addLinks(1, db, links);

			resData.body = 'It worked.';
			resData.status = 200;
			break;
		}

		case '/api/removeLink': {
			const db = createDB(envVars);
			//TODO: get links from request body
			const links = ['placeholder.com'];
			removeLinks(1, db, links);

			resData.body = 'It worked.';
			resData.status = 200;
			break;
		}

		case '/login': {
			const data = await loginHandler(req);
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
			console.log(file.name);

			if (file.name === 'index.css') {
				return new Response(await Deno.readFile(stylesDir + file.name), {
					headers: {
						'content-type': 'text/css',
					},
				});
			}
		}
	}

	return new Response(resData.body, {
		status: resData.status,
		headers: {
			'content-type': resData.contentType,
		},
	});
}

function createDB(args: string): DB {
	const db = args == "development" ? new DB('testing.db') : new DB('main.db');
	return db;
}
