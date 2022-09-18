import { DB } from '../deps.ts';
import { User } from '../types/models/user.ts';

// BUG: No such column "tee"
const addUserMut = `
INSERT INTO users (username, links, blogs, blogsLastUpdated)
VALUES(?, ?, ?, ?)
`;

// TODO: Could adjust User type to take in an array and turn that array into what sqlite is expecting;
export default function addUser(user: User): boolean {
	const { username, links, blogs, blogsLastUpdated } = user;
	const db = new DB('main.db');

	try {
		console.log('Adding user...', [user]);
		db.query(addUserMut, [username, links, blogs, blogsLastUpdated]);
		return true;
	} catch (err) {
		console.error('Error creating user under users table', err);
		return false;
	} finally {
		db.close();
	}
}
