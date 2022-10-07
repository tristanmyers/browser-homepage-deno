import { BlogPost } from '../types/models/blogs.ts';

export function renderBlogs(blogs: BlogPost[] | null) {
	const descCharLimit = 450;
	if (blogs && blogs.length > 0) {
		const sortedBlogs: BlogPost[] = blogs.sort((blog1, blog2) => {
			if (blog1.post.publishedAt && blog2.post.publishedAt) {
				const diff1 = Number(blog1.post.publishedAt) -
					Number(blog2.post.publishedAt);

				const diff2 = Number(blog2.post.publishedAt) -
					Number(blog1.post.publishedAt);

				if (
					diff2 > diff1
				) {
					return 1;
				}

				if (
					diff1 > diff2
				) {
					return -1;
				}

				return 0;
			}

			return 0;
		});

		const blog = sortedBlogs.map((currentBlog) => {
			// BUG: no check to see if url is actual url
			const blogLink = currentBlog.blog.url ?? '';
			const postLink = currentBlog.post.url ?? '';
			const blogTitle = currentBlog.blog.title ?? 'No blog title available';
			const postTitle = currentBlog.post.title ?? 'No post title available';
			const publishedAt = currentBlog.post.publishedAt
				? `Published on: ${currentBlog.post.publishedAt.toLocaleDateString()}`
				: 'Published on: not found';
			// TODO: Need to figure out how to remove html from description
			let description = currentBlog.post.description ??
				'No description available';

			if (currentBlog.post.description) {
				if (currentBlog.post.description.length > descCharLimit) {
					description = currentBlog.post.description.slice(0, descCharLimit) +
						'...';
				}
			}

			return (`
				<div class="blog-card">
					<a class="blog-link" href=${blogLink}>
						${blogTitle}
					</a>
					<a class="blog-link" href=${postLink}>
						${postTitle}
					</a>
					<p>${publishedAt}</p>
					<p>${description}
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
