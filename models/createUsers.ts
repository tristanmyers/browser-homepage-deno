import { DB } from '../deps.ts';

const createUsersMut = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  links TEXT,
	blogs TEXT,
	blogsLastUpdated TEXT
)
`;

export default function createUsers(): boolean {
	const db = new DB('main.db');

	try {
		console.log('Checking if users table exists...');
		db.query(createUsersMut);
		return true;
	} catch (err) {
		console.error('Error creating users table', err);
		return false;
	} finally {
		db.close();
	}
}
