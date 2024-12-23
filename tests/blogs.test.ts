// TODO: fix this, changed asserts or something idk
import * as asserts from '@std/testing';
import { BlogPost } from '../types/models/blogs.ts';
const dirtyDescription =
	`&lt;p&gt;There&amp;rsquo;s a common pattern I&amp;rsquo;ve seen when learning something new, where you can
effectively move towards a larger goal by working on problems just outside of
your reach.  I did a little thinking about what that would look like and how to
find the right steps to take.&lt;/p&gt;
&lt;h4 id="circles-of-knowledge-what-i-do-and-do-not-know"&gt;Circles of knowledge: what I do and do not know&lt;/h4&gt;
&lt;p&gt;Let&amp;rsquo;s`;

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
