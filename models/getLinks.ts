import { DB } from 'sqlite';

const getLinksFromUser = 'SELECT links FROM users WHERE id = ?';

export default function getLinks(userId: number, db: DB): string[] | null {
	let links: string | null = null;

	try {
		console.log('Getting links from user...');

		links = db.query<[string]>(getLinksFromUser, [userId])[0][0];

		if (links) {
			return links.split(',');
		}

		return null;
	} catch (err) {
		console.error('Error getting links from user.', err);
		return null;
	}
}
