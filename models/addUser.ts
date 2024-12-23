import { DB } from 'sqlite';
import { User } from '../types/models/user.ts';

const checkUserExistMut = `
SELECT id FROM users WHERE username = ?
`;

// BUG: No such column "tee"
const addUserMut = `
INSERT INTO users (username, links, blogs, blogsLastUpdated)
VALUES(?, ?, ?, ?)
`;

export default function addUser(user: User, db: DB): boolean {
	const { username, links, blogs, blogsLastUpdated } = user;
	const userExist = checkIfExist(username, db);

	if (userExist === true) return false;

	try {
		console.log('Adding user... \n', [user]);
		db.query(addUserMut, [
			username,
			links.toString(),
			blogs.toString(),
			blogsLastUpdated,
		]);
		return true;
	} catch (err) {
		console.error('Error creating user under users table\n', err);
		return false;
	}
}

function checkIfExist(username: string, db: DB): boolean {
	const user = db.query(checkUserExistMut, [username]);

	if (user.length === 0) {
		return false;
	}
	return true;
}
