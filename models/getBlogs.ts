import { rss } from '../deps.ts';
import { BlogPost } from '../types/models/blogs.ts';
import {
	decode,
	encode,
} from 'https://deno.land/std@0.155.0/encoding/base64.ts';
import { getBlogsLastUpdated } from './getBlogLastUpdated.ts';
import { getBlogsFromUser } from './getBlogLinksFromUser.ts';
import { updateBlogsLastUpdated } from './updateBlogsLastUpdated.ts';

/*
	TODO: Types need proper typing
	TODO: Need to handle duplicate blogs
	BUG: users needs to refresh page after loading if cached blog not found error happens
	TODO: Request will keep sending each time if cached blog not found error happens
	TODO: handle undefined urls
	TODO: handle descriptions being
	TODO: Sort by most recent

	Query the user for blogs -> Get the blogs last updated date -> Check if the date is 5 or more days ago
	If it was fetch the new data from the blog urls.
	If not get the cached blog data.
*/

export default async function getBlogs(
	userId: number,
): Promise<BlogPost[] | null> {
	const cachedBlogLinks: string[] = [];

	const blogs = getBlogsFromUser(userId);
	if (blogs === false) return null;

	// By default we will read from the cache and if we need to update, we fetch and cache then continue on the default path of reading from cache.
	let needsUpdating;
	const lastUpdated = getBlogsLastUpdated(userId);
	if (lastUpdated === false) {
		needsUpdating = false;
	} else {
		needsUpdating = checkLastUpdated(lastUpdated);
	}

	if (needsUpdating) {
		// get blogs urls from db -> fetch blog file from url
		console.log('Updating blog files...');

		for (const link in blogs) {
			const url = new URL(blogs[link]);
			const filePath = `./cached_data/user_${userId}/blogs/${
				encodeFilename(url.href) + '.xml'
			}`;

			// NOTE: Do I even need to await this if i'm using then/catch?
			const blogData = await fetch(url.href).then(async (response) => {
				const encoder = new TextEncoder();
				return encoder.encode(await response.text());
			})
				.catch((err) => {
					console.error('Error fetching blogs from url\n', err);
					return false;
				});

			if (blogData) cacheBlog(userId, filePath, blogData as Uint8Array);

			cachedBlogLinks.push(filePath);
		}
		updateBlogsLastUpdated(userId);
	}

	if (needsUpdating === false) {
		console.log('Reading blogs from cache...');

		blogs.forEach((link) => {
			const url = new URL(link);
			const filePath = `./cached_data/user_${userId}/blogs/${
				encodeFilename(url.href) + '.xml'
			}`;

			cachedBlogLinks.push(filePath);
		});
	}

	const cachedBlogs = readCachedBlogs(cachedBlogLinks, userId);
	if (cachedBlogs === null) return null;

	const feed = createBlogFeed(cachedBlogs);
	return await feed;
}

// Check if the last updated time from db is > 0 days if so return true.
function checkLastUpdated(lastUpdated: string): boolean {
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

	console.log('last updated', daysDifference + ' days ago');

	if (daysDifference >= 5) {
		return true;
	}

	return false;
}

async function cacheBlog(
	userId: number,
	pathToWrite: string,
	blogData: Uint8Array,
): Promise<boolean> {
	try {
		await Deno.writeFile(
			pathToWrite,
			blogData,
		);
		return true;
	} catch (err) {
		if (err instanceof Deno.errors.NotFound) {
			await Deno.mkdir(`./cached_data/user_${userId}/blogs/`, {
				recursive: true,
			});

			await Deno.writeFile(
				pathToWrite,
				blogData,
			);
			return true;
		} else {
			console.error('Error caching blog\n', err);
			return false;
		}
	}
}

// Read blog xml files, parse the rss feeds and return blog with the most recent post.
function readCachedBlogs(blogPaths: string[], userId: number): string[] | null {
	const decoder = new TextDecoder('utf-8');
	const blogs: string[] = [];
	// NOTE: Could this be done better?
	blogPaths.forEach(async (blog) => {
		try {
			console.log('Reading cached blog file...');

			const xml = Deno.readFileSync(blog);
			blogs.push(decoder.decode(xml));
		} catch (err) {
			if (err instanceof Deno.errors.NotFound) {
				console.log('handling no blog file in cache directory');

				const filename = blog.substring(blog.lastIndexOf('/') + 1);
				const base64Filename = filename.slice(0, filename.lastIndexOf('.'));
				const blogURL = decodeFilename(base64Filename);

				const blogData = await fetch(blogURL).then(async (response) => {
					const encoder = new TextEncoder();
					return encoder.encode(await response.text());
				})
					.catch((err) => {
						console.error('Error fetching blogs from url\n', err);
						return false;
					});

				if (blogData) cacheBlog(userId, blog, blogData as Uint8Array);
			} else {
				console.error('Error reading cached blog file: \n', err);
			}
		}
	});

	if (blogs.length <= 0) return null;

	return blogs;
}

// Parse each blog for necessary data and return a list of each blog.
async function createBlogFeed(blogs: string[]): Promise<BlogPost[]> {
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

function encodeFilename(filename: string): string {
	// BUG: This will break when encoding long urls that are longer than the operating system filename character limit.
	const encoder = new TextEncoder();

	const uint8Arr_encodedBlogURL = encoder.encode(
		filename,
	);
	const base64_encodedBlogURL = encode(uint8Arr_encodedBlogURL);
	return base64_encodedBlogURL;
}

function decodeFilename(filename: string): string {
	const decoder = new TextDecoder('utf-8');

	const uint8Arr_decodedBlogURL = decode(filename);
	const str_decodedBlogURL = decoder.decode(uint8Arr_decodedBlogURL);
	return str_decodedBlogURL;
}
