import { IArticle, ICategory } from "@/models";
import { create } from "zustand";

export type LayoutType = "grid" | "list" | "compact";
export type SortType = "newest" | "oldest" | "title-asc" | "title-desc";

type IGlobalStore = {
  // Data
  articles: IArticle[];
  categories: ICategory[];

  // Filtering & Search
  searchQuery: string;
  selectedCategories: string[];
  sortBy: SortType;

  // Layout
  layoutType: LayoutType;

  // Actions
  setArticles: (articles: IArticle[]) => void;
  setCategories: (categories: ICategory[]) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  toggleCategory: (categoryId: string) => void;
  setSortBy: (sort: SortType) => void;
  setLayoutType: (layout: LayoutType) => void;
  clearFilters: () => void;

  // Computed values
  filteredArticles: IArticle[];
};

const useGlobalStore = create<IGlobalStore>((set, get) => ({
  // Initial state
  articles: [],
  categories: [],
  searchQuery: "",
  selectedCategories: [],
  sortBy: "newest",
  layoutType: "grid",

  // Actions
  setArticles: (articles: IArticle[]) => {
    set({ articles });
  },

  setCategories: (categories: ICategory[]) => {
    set({ categories });
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query });
  },

  setSelectedCategories: (categories: string[]) => {
    set({ selectedCategories: categories });
  },

  toggleCategory: (categoryId: string) => {
    const currentCategories = get().selectedCategories;
    const newCategories = currentCategories.includes(categoryId)
      ? currentCategories.filter((id) => id !== categoryId)
      : [...currentCategories, categoryId];
    set({ selectedCategories: newCategories });
  },

  setSortBy: (sort: SortType) => {
    set({ sortBy: sort });
  },

  setLayoutType: (layout: LayoutType) => {
    set({ layoutType: layout });
  },

  clearFilters: () => {
    set({
      searchQuery: "",
      selectedCategories: [],
      sortBy: "newest",
    });
  },

  // Computed filtered articles
  get filteredArticles() {
    const { articles, searchQuery, selectedCategories, sortBy } = get();

    let filtered = [...articles];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.description.toLowerCase().includes(query) ||
          article.category.name.toLowerCase().includes(query),
      );
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((article) =>
        selectedCategories.includes(article.category.id),
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });

    return filtered;
  },
}));

export { useGlobalStore };
