import { rss } from '../deps.ts';

export async function getBlogs() {
	const decoder = new TextDecoder('utf-8');
	const xml = Deno.readFileSync('./blog_testing/madeofbugs.xml');
	const feed = await rss.parseFeed(decoder.decode(xml));
	return feed.title;
}
