export function links(links: string[]) {
	if (links && links.length > 0) {
		return (
			<div>
				{links.map((link) => {
					const linkObj = new URL(link);
					return <a href={linkObj.href}>{linkObj.hostname}</a>;
				})}
			</div>
		);
	} else {
		return <p>No links available</p>;
	}
}
