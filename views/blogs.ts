import { BlogPost } from '../types/models/blogs.ts';

export function blogs(blogs: BlogPost[] | null) {
	console.log('blogs from component', blogs);

	if (blogs && blogs.length > 0) {
		const blog = blogs.map((currentBlog) => {
			// TODO: This link logic is super weird and seems like a lot of work.
			const blogLink = currentBlog.blog.url.includes('http' || 'https')
				? new URL(currentBlog.blog.url).href
				: 'https://' + currentBlog.blog.url;

			const postLink = currentBlog.post.url.includes('http' || 'https')
				? new URL(currentBlog.post.url).href
				: 'https://' + currentBlog.post.url;

			return (`
				<div class="blog-card">
					<a class="blog-link" href=${blogLink}>
						${currentBlog.blog.title}
					</a>
					<a class="blog-link" href=${postLink}>
						${currentBlog.post.title}
					</a>
					<p>${currentBlog.post.description}</p>
				</div>
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
