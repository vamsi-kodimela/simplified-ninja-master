import { Post } from "@/components/post";
import { POSTS } from "@/data/posts";

interface PostPageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const post = POSTS.find((post) => post.slug === slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return <Post post={post} />;
};

export default PostPage;
