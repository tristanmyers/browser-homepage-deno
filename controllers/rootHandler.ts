import { renderToString } from 'preact';
import { app } from '../views/app.tsx';

export function rootHandler(req: Request) {
	let data: BodyInit | null = null;

	if (req.method === 'GET') {
		data = renderToString(app());
	}

	return data;
}
