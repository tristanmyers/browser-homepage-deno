import getBlogs from '../models/getBlogs.ts';
import getLinks from '../models/getLinks.ts';
import { BlogPost } from '../types/models/blogs.ts';
import { renderBlogs } from './blogs.ts';
import { renderLinks } from './links.ts';

let links = 'No links available';
let blogs = 'No blogs available';
const userLinks: string[] | null = getLinks();
const userBlogs: BlogPost[] | null = await getBlogs(1);

// TODO: replaceAll() is not a good solution.
if (userLinks) links = renderLinks(userLinks).replaceAll(',', '');
if (userBlogs) blogs = renderBlogs(userBlogs).replaceAll(',', '');

export function app(_userId: number) {
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
		</body>
	</html>
	`;

	return page;
}
