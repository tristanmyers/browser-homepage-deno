import { DB, Row } from '../deps.ts';

const getLinksFromUser = 'SELECT links FROM users WHERE id = 1';

export default function getLinks(): string[] | null {
	let links: Row[] | null = null;
	const db = new DB('main.db');

	try {
		console.log('Getting links from user...');

		links = db.query(getLinksFromUser);
	} catch (err) {
		console.error('Error getting links from user.', err);
	} finally {
		db.close();
	}

	if (links && links.length > 0) {
		const linksToString: string = links[0][0] as string;
		return linksToString.split(',');
	} else if (links && links.length === 0) {
		return links = null;
	}

	return null;
}
