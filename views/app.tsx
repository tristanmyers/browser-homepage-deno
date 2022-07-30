import getLinks from '../models/getLinks.ts';
import { links } from './links.tsx';

export function app() {
	const userLinks: string[] = getLinks();

	const page = (
		<html>
			<head>
				<title>Tees Homepage</title>
			</head>
			<link
				rel='stylesheet'
				type='text/css'
				href='./public/styles/index.css'
			/>
			<body>
				{links(userLinks)}
			</body>
		</html>
	);

	return page;
}
