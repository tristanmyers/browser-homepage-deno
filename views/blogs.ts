import { BlogPost } from '../types/models/blogs.ts';

export function renderBlogs(blogs: BlogPost[] | null) {
	const descCharLimit = 450;
	if (blogs && blogs.length > 0) {
		const blog = blogs.map((currentBlog) => {
			// TODO: This link logic is super weird and seems like a lot of work.
			const blogLink = currentBlog.blog.url.includes('http' || 'https')
				? new URL(currentBlog.blog.url).href
				: 'https://' + currentBlog.blog.url;

			const postLink = currentBlog.post.url.includes('http' || 'https')
				? new URL(currentBlog.post.url).href
				: 'https://' + currentBlog.post.url;

			const blogTitle = currentBlog.blog.title ?? 'No blog title available';
			const postTitle = currentBlog.post.title ?? 'No post title available';
			const publishedAt = currentBlog.post.publishedAt
				? `Published on: ${currentBlog.post.publishedAt.toLocaleDateString()}`
				: null;

			let description = currentBlog.post.description ??
				'No description available';

			if (currentBlog.post.description) {
				if (currentBlog.post.description.length > descCharLimit) {
					description = currentBlog.post.description.slice(0, descCharLimit) +
						'...';
				}
			}

			console.log(
				description.replace('&(.|\n)*?;', ''),
			);

			return (`
				<div class="blog-card">
					<a class="blog-link" href=${blogLink}>
						${blogTitle}
					</a>
					<a class="blog-link" href=${postLink}>
						${postTitle}
					</a>
					<p>${publishedAt}</p>
					<p>${description.replace(/(<([^>]+)>)/g, '')}
				</div>
			`);
		});

		return (`
			<section id='blogs-feed'>
				<h1>Recent post from favorite blogs</h1>
				<div>${blog}</div>
			</section>
		`);
	} else {
		return (`
			<section>
				<p>Recent post from favorite blogs</p>
				<p>No blogs available</p>
			</section>
		`);
	}
}
