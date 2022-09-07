import { DB, rss } from '../deps.ts';
import { BlogPost } from '../types/models/blogs.ts';

/*
	TODO: Query the user for the blogs.
	TODO: Save time the users blogs were last updated under the user in the db.

	Query the user for blogs -> Get the blogs last updated date -> Check if the date is 24 hours ago
	If it was fetch the new data from the blog urls.
	If not get the cached blog data.
*/

const getBlogsFromUser = `
SELECT blogs 
FROM users
WHERE id = 1;
`;

const getBlogLastUpdated = `
SELECT blogsLastUpdated
FROM users
WHERE id = 1;
`;

const _addBlogsToUser = `
UPDATE users
SET blogs = "./tests/blog_testing/madeofbugs.xml,./tests/blog_testing/madeofskeletons.xml"
WHERE id = 1
`;

export default function getBlogs() {
	const db = new DB('main.db');
	try {
		const lastUpdated = db.query(getBlogLastUpdated);
		db.close();
		const needsUpdating = checkLastUpdated(lastUpdated[0][0] as string);

		// TODO
		if (needsUpdating) {
			// get blogs urls from db -> fetch blog data from urls
		} else {
			// go through each file in ../cached_data/blogs
			// gonna have to figure out how to map urls and cached blog file paths together
		}
	} catch (err) {
		console.error('Error getting blogs last updated from user', err);
		db.close();
		return null;
	}
}

// Check if the last updated time from db is > 0 days if so return true.
function checkLastUpdated(lastUpdated: string) {
	const lastUpdatedDate = new Date(lastUpdated);
	const lastUpdatedDateUTC = Date.UTC(
		lastUpdatedDate.getFullYear(),
		lastUpdatedDate.getMonth(),
		lastUpdatedDate.getDate(),
	);

	const currentDate = new Date();
	const currentDateUTC = Date.UTC(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate(),
	);

	const msPerDay = 1000 * 60 * 60 * 24;
	const daysDifference = Math.floor(
		(currentDateUTC - lastUpdatedDateUTC) / msPerDay,
	);

	console.log('days difference', daysDifference);

	if (daysDifference > 0) {
		return true;
	}

	return false;
}

// Read blog xml files, parse the rss feeds and return blog with the most recent post.
export async function readCachedBlogs(blogUrls: string[]) {
	const decoder = new TextDecoder('utf-8');

	const blogs: string[] = [];
	// NOTE: Could this be done better?
	blogUrls.forEach((blog) => {
		try {
			const xml = Deno.readFileSync(blog);
			blogs.push(decoder.decode(xml));
		} catch (err) {
			console.error('Error reading blog file: ', err);
		}
	});

	if (blogs.length > 0) {
		const feed = await createBlogFeed(blogs);
		return feed;
	}

	return null;
}

// Parse each blog for necessary data and return a list of each blog.
async function createBlogFeed(blogs: string[]) {
	const feed: BlogPost[] = [];
	let recentPost: BlogPost['post'];
	let currentBlog: BlogPost['blog'];

	for (const blog of blogs) {
		const blogData = await rss.parseFeed(
			blog,
		);
		const post = blogData.entries[0];

		currentBlog = {
			title: blogData.title.value,
			url: blogData.id,
		};

		recentPost = {
			title: post.title ? post.title.value : 'Post title not found.',
			url: post.id,
			description: post.description
				? post.description.value
				: 'Description not found.',
			publishedAt: post.published,
		};

		feed.push({ blog: currentBlog, post: recentPost });
	}

	return feed;
}
