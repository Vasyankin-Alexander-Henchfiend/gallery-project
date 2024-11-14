import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { modalReducer } from "../slices/modal";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
