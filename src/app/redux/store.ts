import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "../redux/features/articles/articlesSlice";
import authSlice from "../redux/features/auth/authSlice";
export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
