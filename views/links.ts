export function links(links: string[]) {
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
			<div class='fave-links'>
				${linkElements}
			</div>
		`;
	} else {
		return `<p>No links available</p>`;
	}
}