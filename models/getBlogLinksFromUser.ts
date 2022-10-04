import { DB } from '../deps.ts';

const getBlogsFromUserQuery = `
SELECT blogs 
FROM users
WHERE id = ?;
`;

export function getBlogsFromUser(userId: number): string[] | false {
	const db = new DB('main.db');

	let blogLinks;
	try {
		blogLinks = db.query<[string]>(getBlogsFromUserQuery, [userId])[0][0]
			.split(
				',',
			);
		return blogLinks;
	} catch (err) {
		console.error('Error getting blog links from user\n', err);
		return false;
	} finally {
		db.close();
	}
}
