import { html } from 'html';

// TODO: replaceAll() is not a good solution.
export async function login(): Promise<string> {
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
        <main>
			<form action="/login" method="post">
				<input type="text" name="username" placeholder="Username">
				<input type="password" name="password" placeholder="Password">
				<input type="submit" value="Login">
			</form>
		</main>
        <footer>
          Made by <a href="https://tristanmyers.dev/">Tristan Myers</a>
        </footer>
      </body>
    </html>
  `;

	return page;
}
