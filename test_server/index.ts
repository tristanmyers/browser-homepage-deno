type ResponseData = {
	body: BodyInit;
	status: number;
	contentType: string;
};

const port = 8082;

await Deno.serve({ port }, handler);

async function handler(req: Request): Promise<Response> {
	// Have to always set body and status or else a 500 happens.
	const resData: ResponseData = {
		body: 'Internal server error',
		status: 500,
		contentType: 'text/html',
	};

	const reqUrl = new URL(req.url);

	switch (reqUrl.pathname) {
		case '/madeofbugs.xml': {
			resData.body = await Deno.readFile('./tests/blog_testing/madeofbugs.xml');
			resData.contentType = 'text/xml';
			resData.status = 200;
			break;
		}

		case '/madeofskeletons.xml': {
			resData.body = await Deno.readFile(
				'./tests/blog_testing/madeofskeletons.xml',
			);
			resData.contentType = 'text/xml';
			resData.status = 200;
			break;
		}

		case '/caffeinspiration.xml': {
			resData.body = await Deno.readFile(
				'./tests/blog_testing/caffeinspiration.xml',
			);
			resData.contentType = 'text/xml';
			resData.status = 200;
			break;
		}

		default:
			resData.body = 'Page not found';
			resData.status = 404;
			break;
	}

	return new Response(resData.body, {
		status: resData.status,
		headers: {
			'content-type': resData.contentType,
		},
	});
}
