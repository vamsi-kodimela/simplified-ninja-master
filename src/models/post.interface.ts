interface IPost {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  featuredImage: string;
  createdAt: Date;
  updatedAt: Date;
}

export type { IPost };
