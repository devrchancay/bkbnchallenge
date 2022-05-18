import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { AppApi } from "services/contact";

export const store = configureStore({
  reducer: {
    [AppApi.reducerPath]: AppApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AppApi.middleware),
  devTools: process.env.NODE_ENV === "development",
});

export type RootState = ReturnType<typeof store.getState>;
