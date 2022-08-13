// TODO: adjust to work with blogs data
export function blogs(blogs: string[]) {
	const linkElements = blogs.map((blog) => {
		const linkObj = new URL(blog);
		return `
						<a id='link' class='fave-links-group' href=${linkObj.href}>
							${linkObj.hostname}
						</a>
					`;
	});

	if (blogs && blogs.length > 0) {
		return `
			<div class='fave-links'>
				${linkElements}
			</div>
		`;
	} else {
		return `<p>No links available</p>`;
	}
}
