import { HTMLDocument } from 'https://esm.sh/v91/linkedom@0.14.12/types/html/document.d.ts';
import { linkedom } from '../deps.ts';
import { app } from '../views/app.ts';

export async function rootHandler(
	req: Request,
	userId: number,
): Promise<string | null> {
	let data: null | HTMLDocument = null;

	if (req.method === 'GET') {
		data = new linkedom.DOMParser().parseFromString(
			await app(userId),
			'text/html',
		);
	}

	if (data) {
		return data.toString();
	}

	return data;
}
