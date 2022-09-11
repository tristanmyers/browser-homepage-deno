import { linkedom } from '../deps.ts';
import { app } from '../views/app.ts';

export function rootHandler(req: Request, userId: number) {
	let data = null;

	if (req.method === 'GET') {
		data = new linkedom.DOMParser().parseFromString(app(userId), 'text/html');
	}

	if (data) {
		return data.toString();
	}

	return data;
}
