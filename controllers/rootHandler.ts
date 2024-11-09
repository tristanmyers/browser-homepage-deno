import { realUser, testingUser } from '../data/user.ts';
import { DB } from '../deps.ts';
import * as linkedom from 'linkedom';
import { args } from '../index.ts';
import addUser from '../models/addUser.ts';
import createUsers from '../models/createUsers.ts';
import { app } from '../views/app.ts';

export async function rootHandler(
	req: Request,
	userId: number,
	db: DB,
): Promise<string | null> {
	let data: any = null;

	if (req.method === 'GET') {
		createUsers(db);
		if (args.testing) addUser(testingUser, db);
		if (args.release) addUser(realUser, db);

		data = new linkedom.DOMParser().parseFromString(
			await app(userId, db),
			'text/html',
		);
	}

	if (data === null) {
		return data;
	}

	return data.toString();
}
