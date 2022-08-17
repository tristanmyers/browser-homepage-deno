import { BlogPost } from "../types/models/blogs.ts";

// TODO: adjust to work with blogs data
export function blogs(blogs: BlogPost[]) {
  const blog = blogs.map((currentBlog) => {
    const blogLink = new URL(currentBlog.blog.url);
    const postLink = new URL(currentBlog.post.url);
    return (
      `
				<a id='link' class='fave-links-group' href=${blogLink.href}>
					${currentBlog.blog.title}
				</a>
				<a id='link' class='fave-links-group' href=${postLink.href}>
					${currentBlog.post.title}
				</a>
				<p>${currentBlog.post.description}</p>
			`
    );
  });

  if (blogs && blogs.length > 0) {
    return `
			<div class='blogs-feed'>
				${blog}
			</div>
		`;
  } else {
    return `<p>No blogs available</p>`;
  }
}
