import { DB } from '../deps.ts';

const getLinksFromUser = 'SELECT links FROM users WHERE id = ?';

export default function getLinks(userId: number, db: DB): string[] | null {
	let links: string | null = null;

	try {
		console.log('Getting links from user...');

		links = db.query<[string]>(getLinksFromUser, [userId])[0][0];
		return links.split(',');
	} catch (err) {
		console.error('Error getting links from user.', err);
		return null;
	}
}
