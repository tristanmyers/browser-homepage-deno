import { DB } from 'sqlite';
import { User } from '../types/models/user.ts';

const updateLinksMut = `
UPDATE users
SET links = ? 
WHERE id = ?
`;

export default function updateLinks(
	userId: boolean,
	links: User['links'],
	db: DB,
): boolean {
	try {
		console.log('Checking if users table exists...');
		db.query(updateLinksMut, [userId, links.toString()]);
		return true;
	} catch (err) {
		console.error('Error creating users table', err);
		return false;
	}
}
