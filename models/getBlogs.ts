import { rss } from '../deps.ts';
import { BlogPost } from '../types/models/blogs.ts';

// Read blog xml files, parsed the rss feeds and return blog with recent post.
export async function getBlogs(blogUrls: string[]) {
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
