import { Dayjs } from "dayjs";

interface IArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  category: {
    id: string;
    name: string;
  };
  featuredImage: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
}

export type { IArticle };
