import { DB } from '../deps.ts';

const updateLinksMut = `
UPDATE users
SET links = "https://twitch.tv/,https://youtube.com/,https://reddit.com/,https:twitter.com/,https://news.ycombinator.com"
WHERE id = 1
`;

export default function updateLinks(): boolean {
	const db = new DB('main.db');

	try {
		console.log('Checking if users table exists...');
		db.query(updateLinksMut);
		return true;
	} catch (err) {
		console.error('Error creating users table', err);
		return false;
	} finally {
		db.close();
	}
}
