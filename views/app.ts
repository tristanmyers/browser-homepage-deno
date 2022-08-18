import { getBlogs } from '../models/getBlogs.ts';
import getLinks from '../models/getLinks.ts';
import { blogs } from './blogs.ts';
import { links } from './links.ts';

const userLinks: string[] = getLinks();
const userBlogs = await getBlogs([
	'./tests/blog_testing/madeofbugs.xml',
	'./tests/blog_testing/madeofskeletons.xml',
]);

// TODO: replaceAll() is not a good solution.
export function app() {
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
				${links(userLinks).replaceAll(',', '')}
				${blogs(userBlogs).replaceAll(',', '')}
			</main>
		</body>
	</html>
	`;

	return page;
}
