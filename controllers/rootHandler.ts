import { DOMParser } from 'linkedDom/';
import { app } from '../views/app.tsx';

export function rootHandler(req: Request) {
	let data = null;

	if (req.method === 'GET') {
		data = new DOMParser().parseFromString(app(), 'text/html');
	}

	if (data) {
		return data.toString();
	}

	return data;
}
