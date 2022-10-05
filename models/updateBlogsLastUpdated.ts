import { db } from "../index.ts";

const updateBlogLastUpdatedMut = `
UPDATE users
SET blogsLastUpdated = ?
WHERE id = ? 
`;

// Update the blogs last updated time in the db
export function updateBlogsLastUpdated(userId: number): boolean {
	try {
		console.log('Updating blogs last updated time...');

		const currentDate = new Date();
		db.query(updateBlogLastUpdatedMut, [currentDate.toISOString(), userId]);
		return true;
	} catch (err) {
		console.error('Error updating blog last updated time', err);
		return false;
	}
}
