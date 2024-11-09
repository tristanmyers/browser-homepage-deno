import { html } from 'html';
import { BlogPost } from '../types/models/blogs.ts';
import {
	Html4Entities,
	Html5Entities,
	XmlEntities,
} from '../util/deno_html_entities/mod.js';
// @deno-types="npm:@types/sanitize-html@2"
import sanitizeHtml from 'sanitize-html';

// NOTE: This could be done in getBlogs but whatever.
// Removes all html tags
function cleanIt(dirtyStr: string): string {
	const cleaned = Html5Entities.decode(
		Html4Entities.decode(XmlEntities.decode(dirtyStr)),
	);
	return sanitizeHtml(cleaned, { allowedTags: [] });
}

// function getBlogURL(blog: BlogPost['blog'] | BlogPost['post']) {
// 	const url = blog.url.includes('http' || 'https')
// 		? new URL(blog.url).href
// 		: 'https://' + blog.url;
//
// 	return url;
// }

// Sortes blogs based on publishedAt, most recent -> earliest  
function sortBlogs(blogs: BlogPost[]): BlogPost[] {
	return blogs.sort((blog1, blog2) => {
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
}

export function renderBlogs(blogs: BlogPost[] | null) {
	const descCharLimit = 450;

	if (blogs && blogs.length > 0) {
		const blog = sortBlogs(blogs).map((currentBlog) => {
			const blogLink = currentBlog.blog.url;
			const postLink = currentBlog.post.url;

			const blogTitle = currentBlog.blog.title ?? 'No blog title available';
			const postTitle = currentBlog.post.title ?? 'No post title available';
			const publishedAt = currentBlog.post.publishedAt
				? `Published on: ${currentBlog.post.publishedAt.toLocaleDateString()}`
				: null;
			// TODO: Need to figure out how to remove html
			let description = currentBlog.post.description ??
				'No description available';

			if (currentBlog.post.description) {
				if (currentBlog.post.description.length > descCharLimit) {
					description = currentBlog.post.description.slice(0, descCharLimit) +
						'...';
				}
			}

			return html`
        <div class="blog-card">
          <a class="blog-link" href=${blogLink}> ${cleanIt(blogTitle)} </a>
          <a class="blog-link" href=${postLink}> ${cleanIt(postTitle)} </a>
          <p>${cleanIt(publishedAt || '')}</p>
          <p>${cleanIt(description)}</p>
        </div>
      `;
		});

		return html`
      <section id="blogs-feed-container">
        <h1>Recent post from favorite blogs</h1>
        <div id="blogs-feed">${blog}</div>
      </section>
    `;
	} else {
		return html`
      <section>
        <p>Recent post from favorite blogs</p>
        <p>No blogs available</p>
      </section>
    `;
	}
}
