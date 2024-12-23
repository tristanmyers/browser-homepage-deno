import { DB } from 'sqlite';

const addBlogsToUserMut = `
UPDATE users
SET blogs = ? 
WHERE id = ?
`;

export function addBlogsToUser(
	userId: number,
	blogLinks: string[],
	db: DB,
): boolean {
	try {
		db.query<[string]>(addBlogsToUserMut, [blogLinks.toString(), userId]);
		return true;
	} catch (err) {
		console.log('Error adding blogs to user\n', err);
		return false;
	}
}
