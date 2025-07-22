interface IArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string[];
  featuredImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { IArticle };
