import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

interface IArticle {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: SerializedEditorState;
  category: {
    id: string;
    name: string;
    slug: string;
  }[];
  featuredImage: {
    url: string;
  };
  createdAt: string;
  updatedAt: string;
  isFeatured: boolean;
}

export type { IArticle };
