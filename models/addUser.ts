import { db } from '../index.ts';
import { User } from '../types/models/user.ts';

const checkUserExistMut = `
SELECT id FROM users WHERE username = ?
`;

// BUG: No such column "tee"
const addUserMut = `
INSERT INTO users (username, links, blogs, blogsLastUpdated)
VALUES(?, ?, ?, ?)
`;

// TODO: Could adjust User type to take in an array and turn that array into what sqlite is expecting;
export default function addUser(user: User): boolean {
	const { username, links, blogs, blogsLastUpdated } = user;
	const userExist = checkIfExist(username);

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
	} finally {
		db.close();
	}
}

function checkIfExist(username: string): boolean {
	const user = db.query(checkUserExistMut, [username]);

	if (user.length === 0) {
		return false;
	}
	return true;
}
