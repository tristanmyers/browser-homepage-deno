import { db } from "../index.ts";

const getBlogLastUpdatedQuery = `
SELECT blogsLastUpdated
FROM users
WHERE id = ?
`;

export function getBlogsLastUpdated(userId: number): string | false {
	try {
		console.log('Getting blogs last updated time...');

		const lastUpdated =
			db.query<[string]>(getBlogLastUpdatedQuery, [userId])[0][0];
		return lastUpdated;
	} catch (err) {
		console.error('Error getting blogs last updated from user\n', err);
		return false;
	}
}
