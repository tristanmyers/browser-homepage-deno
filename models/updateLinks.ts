import { DB } from 'sqlite';
import { User } from '../types/models/user.ts';
import getLinks from './getLinks.ts';

const updateLinksMut = `
UPDATE users
SET links = ? 
WHERE id = ?
`;

// Update all links as one string under user in DB
function updateLinksInDB(
	userId: number,
	links: User['links'],
	db: DB,
): boolean {
	try {
		console.log('Checking if users table exists...');
		db.query(updateLinksMut, [links.toString(), userId]);
		return true;
	} catch (err) {
		console.error('Error creating users table', err);
		return false;
	}
}

// Adds links in batches.
export function addLinks(userId: number, db: DB, addedLinks: string[]): boolean {
	const linksFromDB = getLinks(userId, db);

	if (linksFromDB) {
		addedLinks.forEach((link) => linksFromDB.push(link));
		return updateLinksInDB(userId, linksFromDB, db);
	}

	return false;
}

// Removes links in batches.
export function removeLinks(userId: number, db: DB, removedLinks: string[]): boolean {
	const linksFromDB = getLinks(userId, db);

	if (linksFromDB) {
		removedLinks.forEach((link) => {
			if (linksFromDB.includes(link)) {
				const linkIndex = linksFromDB.indexOf(link);
				linksFromDB.splice(linkIndex, 1);
			}
		});

		return updateLinksInDB(userId, linksFromDB, db);
	}

	return false;
}
