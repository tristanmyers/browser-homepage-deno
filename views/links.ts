export function renderLinks(links: string[]) {
	const linkElements = links.map((link) => {
		const linkObj = new URL(link);
		return `
						<a id='link' class='fave-links-group' href=${linkObj.href}>
							${linkObj.hostname}
						</a>
					`;
	});

	if (links && links.length > 0) {
		return `
			<section id='fave-links'>
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
