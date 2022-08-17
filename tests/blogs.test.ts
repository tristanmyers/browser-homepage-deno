import { asserts } from '../deps.ts';
import { getBlogs } from '../models/getBlogs.ts';
import { BlogPost } from '../types/models/blogs.ts';

const blogs = getBlogs([
	'./tests/blog_testing/madeofbugs.xml',
]);

const { assertEquals } = asserts;
Deno.test('blogs test', () => {
	const testBlog: BlogPost = {
		blog: {
			title: 'Posts on Made of Bugs',
			url: 'https://blog.nelhage.com/post/',
		},
		post: {
			title: 'Distributed cloud builds for everyone',
			url: 'https://blog.nelhage.com/post/distributed-builds-for-everyone/',
			description: 'This is a description',
			publishedAt: new Date('Mon, 31 May 2021 16:05:17 -0700'),
		},
	};

	assertEquals(blogs, [testBlog]);
});
