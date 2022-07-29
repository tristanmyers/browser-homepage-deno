import { serve } from 'http/server.ts';
import { renderToString } from 'preact';
import { serveDir, serveFile } from 'http/file_server.ts';

import { app } from './views/app.tsx';

type ResponseData = {
	body: BodyInit;
	status: number;
	contentType: string;
};

const port = 8000;

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

	// TODO:  This doesn't work properly
	serveDir(req, { fsRoot: './public/styles/' });
	return new Response(resData.body, {
		status: resData.status,
		headers: {
			'content-type': resData.contentType,
		},
	});
}
