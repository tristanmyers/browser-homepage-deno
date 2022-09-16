import { BlogPost } from '../types/models/blogs.ts';

export function renderBlogs(blogs: BlogPost[] | null) {
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
					<p>${
				currentBlog.post.publishedAt
					? `Published on: ${currentBlog.post.publishedAt.toLocaleDateString()}`
					: null
			}</p>
					<p>${currentBlog.post.description}</p>
				</div>
			`);
		});

		return (`
			<section id='blogs-feed'>
				${blog}
			</section>
		`);
	} else {
		return (`
			<section>
				<p>No blogs available</p>
			</section>
		`);
	}
}
