export function renderLinks(links: string[]) {
	const linkElements = links.map((link) => {
		const linkObj = new URL(link);
		console.log('link being rendered', link);
		console.log('linkObj', linkObj);

		return `
						<a id='link' class='fave-links-group' href=${linkObj.href}>
							${linkObj.hostname}
						</a>
					`;
	});

	if (links && links.length > 0) {
		return `
		<section id='fave-links'>
			<h1>Common links</h1>
			${linkElements}
		</section>
		`;
	} else {
		return (`
			<section>
				<p>No links available</p>
			</section>
		`);
	}
}
