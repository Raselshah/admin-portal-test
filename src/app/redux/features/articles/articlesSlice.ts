import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { articles } from "../../../../api/mockData";
import { IArticle } from "../../../../types/IArticle.type";

interface Filters {
  author: string | null;
  dateRange: [string, string] | null;
  searchTerm: string;
  sortBy: "views" | "likes" | "comments" | null;
  sortOrder: "ascend" | "descend" | null;
}

interface ArticlesState {
  articles: IArticle[];
  filters: Filters;
}

const initialState: ArticlesState = {
  articles: articles,
  filters: {
    author: null,
    dateRange: null,
    searchTerm: "",
    sortBy: null,
    sortOrder: null,
  },
};

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Partial<Filters>>) {
      state.filters = { ...state.filters, ...action.payload };
    },
    updateArticle(state, action: PayloadAction<IArticle>) {
      const index = state.articles.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.articles[index] = action.payload;
      }
    },
  },
});

export const { setFilters, updateArticle } = articlesSlice.actions;
export default articlesSlice.reducer;
