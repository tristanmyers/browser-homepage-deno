export type BlogPost = {
  blog: {
    title: string | undefined;
    url: string;
  };
  post: {
    title: string | undefined;
    url: string;
    description: string | undefined;
    publishedAt: Date | undefined;
  };
};
