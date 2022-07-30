import { serve } from 'http/server.ts';
import { rootHandler } from './controllers/rootHandler.ts';

type ResponseData = {
	body: BodyInit;
	status: number;
	contentType: string;
};

const port = 8000;
const stylesDir = './public/styles/';

await serve(handler, { port });

async function handler(req: Request): Promise<Response> {
	const resData: ResponseData = {
		body: 'Internal server error',
		status: 500,
		contentType: 'text/html',
	};

	const reqUrl = new URL(req.url);

	switch (reqUrl.pathname) {
		case '/': {
			const data = rootHandler(req);
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

	return new Response(resData.body, {
		status: resData.status,
		headers: {
			'content-type': resData.contentType,
		},
	});
}
