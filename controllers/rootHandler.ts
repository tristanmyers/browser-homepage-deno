import { HTMLDocument } from 'https://esm.sh/v91/linkedom@0.14.12/types/html/document.d.ts';
import { linkedom } from '../deps.ts';
import addUser from '../models/addUser.ts';
import createUsers from '../models/createUsers.ts';
import { User } from '../types/models/user.ts';
import { app } from '../views/app.ts';

const testingUser: User = {
	username: 'tee',
	links:
		'https://twitch.tv/directory/following/live,https://youtube.com/,https://reddit.com/,https://twitter.com/,https://news.ycombinator.com,https://github.com/',
	blogs:
		'http://localhost:8082/madeofbugs.xml,http://localhost:8082/madeofskeletons.xml',
	blogsLastUpdated: `${new Date().toISOString()}`,
};

const _realBlogs =
	'https://sadgrl.online/feed.xml,https://cheapskatesguide.org/cheapskates-guide-rss-feed.xml,https://blog.nelhage.com/atom.xml,https://www.christianheilmann.com/feed/,https://kinduff.com/feed.xml,https://alexanderell.is/index.xml,https://calpaterson.com/calpaterson.rss,https://www.happyassassin.net/rss.xml,https://tim.mcnamara.nz/rss,https://blog.relyabilit.ie/rss/,https://xakcop.com/index.xml,https://www.jvt.me/kind/articles/feed.xml,https://macwright.com/rss.xml,https://tinyprojects.dev/feed.xml,https://www.joshwcomeau.com/rss.xml,https://www.danielsieger.com/atom.xml';

const _testingBlogLinks = [
	'http://localhost:8082/madeofbugs.xml',
	'http://localhost:8082/madeofskeletons.xml',
];

export async function rootHandler(
	req: Request,
	userId: number,
): Promise<string | null> {
	let data: null | HTMLDocument = null;

	if (req.method === 'GET') {
		createUsers();
		addUser(testingUser);

		data = new linkedom.DOMParser().parseFromString(
			await app(userId),
			'text/html',
		);
	}

	if (data) {
		return data.toString();
	}

	return data;
}
