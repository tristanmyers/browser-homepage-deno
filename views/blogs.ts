import { html } from "../deps.ts";
import { BlogPost } from "../types/models/blogs.ts";
import { Html5Entities, XmlEntities, Html4Entities } from "../util/deno_html_entities/mod.js";

function cleanIt(str: string): string {
  return Html5Entities.decode(Html4Entities.decode(XmlEntities.decode(str)));
}

function getBlogURL(blog: BlogPost["blog"] | BlogPost["post"]) {
  const url = blog.url.includes("http" || "https")
    ? new URL(blog.url).href
    : "https://" + blog.url;

  return url;
}

export function renderBlogs(blogs: BlogPost[] | null) {
  const descCharLimit = 450;

  if (blogs && blogs.length > 0) {
    const blog = blogs.map((currentBlog) => {
      // TODO: This link logic is super weird and seems like a lot of work.
      const blogLink = getBlogURL(currentBlog.blog);
      const postLink = getBlogURL(currentBlog.post);

      const blogTitle = currentBlog.blog.title ?? "No blog title available";
      const postTitle = currentBlog.post.title ?? "No post title available";
      const publishedAt = currentBlog.post.publishedAt
        ? `Published on: ${currentBlog.post.publishedAt.toLocaleDateString()}`
        : null;
      // TODO: Need to figure out how to remove html
      let description =
        currentBlog.post.description ?? "No description available";

      if (currentBlog.post.description) {
        if (currentBlog.post.description.length > descCharLimit) {
          description =
            currentBlog.post.description.slice(0, descCharLimit) + '<script>alert("YOU HAVE BEEN HACKED 1337 HAHAH")</script>';
        }
      }

      return html`
        <div class="blog-card">
          <a class="blog-link" href=${blogLink}> ${blogTitle} </a>
          <a class="blog-link" href=${postLink}> ${postTitle} </a>
          <p>${publishedAt}</p>
          <p>${cleanIt(description)}</p>
        </div>
      `;
    });

    return html`
      <section id="blogs-feed">
        <h1>Recent post from favorite blogs</h1>
        <div>${blog}</div>
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
