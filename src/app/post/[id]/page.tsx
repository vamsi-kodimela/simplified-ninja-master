import { Post } from "@/components/post";
import { POSTS } from "@/data/posts";

interface PostPageProps {
  params: {
    id: string;
  };
}

const PostPage = async ({ params }: PostPageProps) => {
  const { id } = await params;
  const post = POSTS.find((post) => post.id === id);  
  if (!post) {
    return <div>Post not found</div>;
  }
  return <Post post={post} />;
};

export default PostPage;
