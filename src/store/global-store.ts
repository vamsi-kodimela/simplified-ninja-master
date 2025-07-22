import { IArticle } from "@/models";
import { create } from "zustand";

type IGlobalStore = {
  articles: IArticle[];
  setArticles: (articles: IArticle[]) => void;
};

const useGlobalStore = create<IGlobalStore>((set) => ({
  articles: [],
  setArticles: (articles: IArticle[]) => {
    set({ articles });
  },
}));

export { useGlobalStore };
