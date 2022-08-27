import { DB, Row } from '../deps.ts';

const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  links TEXT,
	blogs TEXT,
	blogsLastUpdated TEXT
)
`;

// BUG: No such column "tee"
const _addUser = `
INSERT INTO users (id, username, links, blogs, blogsLastUpdated)
VALUES(1, "tee", "https://twitch.tv/directory/following/live,https://youtube.com/,https://reddit.com/,https:twitter.com/,https://news.ycombinator.com", "./tests/blog_testing/madeofbugs.xml,./tests/blog_testing/madeofskeletons.xml", "2022-08-27T19:49:48.828Z")
`;

const _addLinksToUser = `
UPDATE users
SET links = "https://twitch.tv/,https://youtube.com/,https://reddit.com/,https:twitter.com/,https://news.ycombinator.com"
WHERE id = 1
`;

const getLinksFromUser = 'SELECT links FROM users WHERE id = 1';

export default function getLinks(): string[] | null {
	let links: Row[] | null = null;
	const db = new DB('main.db');

	try {
		db.query(createUsers);
	} catch (err) {
		console.error('Error creating user', err);
	}

	try {
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
