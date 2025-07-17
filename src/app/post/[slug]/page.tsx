import { POSTS } from "@/data/posts";
import styles from "./page.module.css";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PostPage = async ({ params }: PostPageProps) => {
  const slug = (await params).slug;
  const post = POSTS.find((post) => post.slug === slug);
  if (!post) {
    return <div>Post not found</div>;
  }
  return (
    <div className={styles.layout}>
      <img
        src={post.featuredImage}
        alt={post.title}
        className={styles.featuredImage}
      />
      <div className={styles.metadata}>
        <div className={styles.category}>{post.category}</div>
        <div className={styles.createdAt}>
          {post.createdAt.toLocaleDateString()}
        </div>
      </div>
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.description}>{post.description}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  );
};

export default PostPage;
