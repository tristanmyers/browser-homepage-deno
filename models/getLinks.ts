import { DB, Row } from 'sqlite/mod.ts';

export default function getLinks(): string[] {
	const db = new DB('main.db');
	db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      links TEXT 
    )
  `);

	const links: Row[] = db.query('SELECT links FROM users WHERE id = 1');
	const linksToString: string = links[0][0] as string;

	db.close();
	return linksToString.split(',');
}

/*
   * TODO: Use this for adding query. Not sure how to make it where other people can't add a link.
  // Run a simple query
  for (const name of names) {
    db.query("INSERT INTO people (name) VALUES (?)", [name]);
  }
  */
