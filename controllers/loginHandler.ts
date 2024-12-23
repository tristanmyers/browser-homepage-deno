import { login } from '../views/login.ts';
import * as linkedom from 'linkedom';

export async function loginHandler(req: Request) {
	let data = null;
	if (req.method === 'GET') {
		data = new linkedom.DOMParser().parseFromString(
			await login(),
			'text/html',
		);
	}

	if (req.method === 'POST') {
		console.log('Login submitted: ' + req.body);
	}

	if (data === null) {
		return data;
	}

	return data.toString();
}
