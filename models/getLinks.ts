import { DB, Row } from '../deps.ts';

const createUsers = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  links TEXT 
)
`;

// BUG: No such column "tee"
const _addUser = `
INSERT INTO users (id, username, links)
VALUES(1, "tee", "https://twitch.tv/directory/following,https://youtube.com/,https://reddit.com/,https:twitter.com/,https://news.ycombinator.com")
`;

const _addLinksToUser = `
UPDATE users
SET links = "https://twitch.tv/,https://youtube.com/,https://reddit.com/,https:twitter.com/,https://news.ycombinator.com"
WHERE id = 1
`;

const getLinksFromUser = 'SELECT links FROM users WHERE id = 1';

export default function getLinks(): string[] {
	const db = new DB('main.db');
	db.query(createUsers);

	const links: Row[] = db.query(getLinksFromUser);
	const linksToString: string = links[0][0] as string;

	db.close();
	return linksToString.split(',');
}
