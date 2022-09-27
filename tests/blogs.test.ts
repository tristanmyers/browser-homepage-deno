import { asserts } from '../deps.ts';
import getBlogs from '../models/getBlogs.ts';
import { BlogPost } from '../types/models/blogs.ts';

const blogs = await getBlogs(1);

const { assertEquals } = asserts;
Deno.test('blogs test', () => {
	const testBlog: BlogPost[] = [
		{
			blog: {
				title: 'Posts on Made of Bugs',
				url: 'https://blog.nelhage.com/post/',
			},
			post: {
				title: 'Distributed cloud builds for everyone',
				url: 'https://blog.nelhage.com/post/distributed-builds-for-everyone/',
				description: 'This is a description',
				publishedAt: new Date('2021-05-31T23:05:17.000Z'),
			},
		},
		{
			blog: { title: 'Posts on Made of Skeletons', url: 'teessandbox.com' },
			post: {
				title: 'Distributed cloud builds for everyone',
				url: 'https://blog.nelhage.com/post/distributed-builds-for-everyone/',
				description:
					'CPU cycles are cheaper than they have ever been, and cloud computing has never been more ubiquitous....',
				publishedAt: new Date('2021-05-31T23:05:17.000Z'),
			},
		},
	];

	assertEquals(blogs, testBlog);
});
