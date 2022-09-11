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
WHERE id = ?;
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

export default function getBlogs(userId: number) {
	const db = new DB('main.db');
	let needsUpdating;
	try {
		console.log('Getting blogs last updated time...');

		const lastUpdated = db.query(getBlogLastUpdated);
		needsUpdating = checkLastUpdated(lastUpdated[0][0] as string);
	} catch (err) {
		console.error('Error getting blogs last updated from user', err);
		return null;
	}

	// TODO
	if (needsUpdating) {
		// get blogs urls from db -> fetch blog data from urls
		const cachedBlogLinks: any[] = [];
		let blogLinks;

		try {
			blogLinks = db.query<[string]>(getBlogsFromUser, [userId])[0][0]
				.split(
					',',
				);
		} catch (err) {
			console.error('Error getting blog links from user', err);
		} finally {
			db.close();
		}

		if (blogLinks) {
			blogLinks.forEach(async (link) => {
				const url = new URL('http://localhost:8081/madeofbugs.xml');
				const blogData = await fetch(url.href);
				const encoder = new TextEncoder();
				const uint8_blogData = encoder.encode(await blogData.text());

				try {
					await Deno.writeFile(
						`./cached_data/user_${userId}/blogs${url.pathname}`,
						uint8_blogData,
					);
				} catch (err) {
					if (err instanceof Deno.errors.NotFound) {
						await Deno.mkdir(`./cached_data/user_${userId}/blogs/`, {
							recursive: true,
						});

						await Deno.writeFile(
							`./cached_data/user_${userId}/blogs${url.pathname}`,
							uint8_blogData,
						);
					}
				}
				// BUG: not pushing correctly.
				cachedBlogLinks.push(
					`./cached_data/user_${userId}/blogs/${url.pathname}`,
				);
				console.log('pushed cached link');
			});
		}

		console.log(cachedBlogLinks);
		readCachedBlogs(cachedBlogLinks);
	} else {
		// go through each file in ../cached_data/blogs
		// gonna have to figure out how to map urls and cached blog file paths together
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
async function readCachedBlogs(blogUrls: string[]) {
	const decoder = new TextDecoder('utf-8');

	const blogs: string[] = [];
	// NOTE: Could this be done better?
	blogUrls.forEach((blog) => {
		try {
			console.log('Reading cached blog file...');

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

	console.log('User blog feed', feed);

	return feed;
}
