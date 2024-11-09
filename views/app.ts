import { html } from 'html';
import { DB } from 'sqlite';
import getBlogs from '../models/getBlogs.ts';
import getLinks from '../models/getLinks.ts';
import { BlogPost } from '../types/models/blogs.ts';
import { renderBlogs } from './blogs.ts';
import { renderLinks } from './links.ts';

// TODO: replaceAll() is not a good solution.
export async function app(userId: number, db: DB): Promise<string> {
	let links = 'No links available';
	let blogs = 'No blogs available';
	const userLinks: string[] | null = getLinks(userId, db);
	const userBlogs: BlogPost[] | null = await getBlogs(userId, db);

	if (userLinks && userLinks.length > 0) {
		links = renderLinks(userLinks).replaceAll(',', '');
	}
	if (userBlogs) blogs = renderBlogs(userBlogs).replaceAll(',', '');

	const page = html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Tees Homepage</title>
        <link
          rel="stylesheet"
          type="text/css"
          href="./public/styles/index.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://rsms.me/inter/inter.css"
        />
      </head>
      <body>
        <section id="banner-container">
          <p id="scrolling-banner">Hello, world! Am I scrolling?</p>
        </section>
        <main>${links} ${blogs}</main>
        <footer>
          Made by <a href="https://tristanmyers.dev/">Tristan Myers</a>
        </footer>
      </body>
    </html>
  `;

	return page;
}
