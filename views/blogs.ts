import { BlogPost } from '../types/models/blogs.ts';

export function blogs(blogs: BlogPost[] | null) {
	console.log('blogs from component', blogs);

	if (blogs && blogs.length > 0) {
		let blogLink: URL;
		let postLink: URL;
		const blog = blogs.map((currentBlog) => {
			if (currentBlog.blog.url.includes('http' || 'https')) {
				blogLink = new URL(currentBlog.blog.url);
			}

			if (currentBlog.post.url.includes('http' || 'https')) {
				postLink = new URL(currentBlog.post.url);
			}

			return (`
					<a id='link' class='fave-links-group' href=${
				blogLink.href || currentBlog.blog.url
			}>
						${currentBlog.blog.title}
					</a>
					<a id='link' class='fave-links-group' href=${
				postLink.href || currentBlog.post.url
			}>
						${currentBlog.post.title}
					</a>
					<p>${currentBlog.post.description}</p>
				`);
		});

		return (`
			<div id='blogs-feed'>
				${blog}
			</div>
		`);
	} else {
		return `<p>No blogs available</p>`;
	}
}
