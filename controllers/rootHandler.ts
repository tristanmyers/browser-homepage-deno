import { linkedom } from '../deps.ts';
import { app } from '../views/app.tsx';

export function rootHandler(req: Request) {
	let data = null;

	if (req.method === 'GET') {
		data = new linkedom.DOMParser().parseFromString(app(), 'text/html');
	}

	if (data) {
		return data.toString();
	}

	return data;
}
