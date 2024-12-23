import { realUser, testingUser } from '../data/user.ts';
import { DB } from 'sqlite';
import * as linkedom from 'linkedom';
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
		if (Deno.env.has("ENV_TYPE")) {
			const envType = Deno.env.get("ENV_TYPE");
			if (envType == "production") addUser(realUser, db);
			if (envType == "development") addUser(testingUser, db);
		} else {
			console.warn("No environment variables: ENV_TYPE has not been set");
		}

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
