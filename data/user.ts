import { User } from '../types/models/user.ts';

export const testingUser: User = {
	username: 'tee',
	links: [
		'https://twitch.tv/directory/following/live',
		'https://youtube.com/',
		'https://reddit.com/',
		'https://twitter.com/',
		'https://news.ycombinator.com',
		'https://github.com/',
    'https://netflix.com/',
	],
	blogs: [
		'http://localhost:8082/madeofbugs.xml',
		'http://localhost:8082/madeofskeletons.xml',
		'http://localhost:8082/caffeinspiration.xml',
	],
	blogsLastUpdated: `${new Date().toISOString()}`,
};

export const realUser: User = {
	username: 'tee',
	links: [
		'https://twitch.tv/directory/following/live',
		'https://youtube.com/',
		'https://reddit.com/',
		'https://twitter.com/',
		'https://news.ycombinator.com',
		'https://github.com/',
		'https://netflix.com/',
	],
	blogs: [
		'https://sadgrl.online/feed.xml',
		'https://cheapskatesguide.org/cheapskates-guide-rss-feed.xml',
		'https://blog.nelhage.com/atom.xml',
		'https://www.christianheilmann.com/feed/',
		'https://kinduff.com/feed.xml',
		'https://alexanderell.is/index.xml',
		'https://calpaterson.com/calpaterson.rss',
		'https://www.happyassassin.net/rss.xml',
		'https://blog.relyabilit.ie/rss/',
		'https://xakcop.com/index.xml',
		'https://www.jvt.me/kind/articles/feed.xml',
		'https://macwright.com/rss.xml',
		'https://tinyprojects.dev/feed.xml',
		'https://www.joshwcomeau.com/rss.xml',
		'https://www.danielsieger.com/atom.xml',
		'https://solar.lowtechmagazine.com/feeds/all-en.atom.xml',
		'https://interconnected.org/home/feed',
		'https://etiennefd.substack.com/feed',
		'https://feeds.feedburner.com/berkes',
	],
	blogsLastUpdated: `${new Date().toISOString()}`,
};
