import { db } from '../index.ts';

const createUsersMut = `
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	user TEXT UNIQUE,
	links TEXT, 
	blogs TEXT,
	blogsLastUpdated TEXT
)
`;

export default function createUsers(): boolean {
	try {
		console.log('Checking if users table exists...');
		db.query(createUsersMut);
		return true;
	} catch (err) {
		console.error('Error creating users table\n', err);
		return false;
	} finally {
		db.close();
	}
}
