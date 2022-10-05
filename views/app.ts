import getBlogs from '../models/getBlogs.ts';
import getLinks from '../models/getLinks.ts';
import { BlogPost } from '../types/models/blogs.ts';
import { renderBlogs } from './blogs.ts';
import { renderLinks } from './links.ts';

const _testBlogs: BlogPost[] = [
	{
		blog: {
			title: 'Posts on Made of Bugs',
			url: 'https://blog.nelhage.com/post/',
		},
		post: {
			title: 'Distributed cloud builds for everyone',
			url: 'https://blog.nelhage.com/post/distributed-builds-for-everyone/',
			description: 'This is a description',
			publishedAt: new Date('2021-05-31T23:05:17.000Z'),
		},
	},
	{
		blog: { title: 'Posts on Made of Skeletons', url: 'teessandbox.com' },
		post: {
			title: 'Distributed cloud builds for everyone',
			url: 'https://blog.nelhage.com/post/distributed-builds-for-everyone/',
			description:
				'CPU cycles are cheaper than they have ever been and cloud computing has never been more ubiquitous. All the major cloud providers offer generous free tiers and services like GitHub Actions offer free compute resources to open-source repositories. So why do so many developers still build software on their laptops? Despite the embarrassment of riches of cheap or even free cloud compute most projects I know of and most developers still do most of their software development — building and running code — directly on their local machines.',
			publishedAt: new Date('2021-05-31T23:05:17.000Z'),
		},
	},
];

// TODO: replaceAll() is not a good solution.
export async function app(userId: number): Promise<string> {
	let links = 'No links available';
	let blogs = 'No blogs available';
	const userLinks: string[] | null = getLinks(userId);
	const userBlogs: BlogPost[] | null = await getBlogs(userId);

	if (userLinks && userLinks.length > 0) {
		links = renderLinks(userLinks).replaceAll(',', '');
	}
	if (userBlogs) blogs = renderBlogs(userBlogs).replaceAll(',', '');

	const page = `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta http-equiv="X-UA-Compatible" content="IE=edge" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Tees Homepage</title>
			<link
				rel='stylesheet'
				type='text/css'
				href='./public/styles/index.css'
			/>
		</head>
		<body>
			<main>
				${links}
				${blogs}
			</main>
			<footer>Made by <a href="https://tristanmyers.dev/">Tristan Myers</a></footer>
		</body>
	</html>
	`;

	return page;
}
