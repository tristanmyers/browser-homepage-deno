import { HTMLDocument } from 'https://esm.sh/v91/linkedom@0.14.12/types/html/document.d.ts';
import { realUser, testingUser } from '../data/user.ts';
import { linkedom } from '../deps.ts';
import { args } from '../index.ts';
import addUser from '../models/addUser.ts';
import createUsers from '../models/createUsers.ts';
import { app } from '../views/app.ts';


export async function rootHandler(
	req: Request,
	userId: number,
): Promise<string | null> {
	let data: null | HTMLDocument = null;

	if (req.method === 'GET') {
		createUsers();
		if (args.testing) addUser(testingUser);
		if (args.release) addUser(realUser);

		data = new linkedom.DOMParser().parseFromString(
			await app(userId),
			'text/html',
		);
	}

	if (data === null) {
		return data;
	}

	return data.toString();
}
