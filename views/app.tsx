import { getBlogs } from '../models/getBlogs.ts';
import getLinks from '../models/getLinks.ts';
import { blogs } from './blogs.tsx';
import { links } from './links.tsx';

export function app() {
	const userLinks: string[] = getLinks();
	const userBlogs = getBlogs();

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
				${links(userLinks).replaceAll(',', '')}
		</body>
	</html>
	`;

	return page;
}
