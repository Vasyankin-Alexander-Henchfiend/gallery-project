import { configureStore } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import { modalReducer } from "../slices/modal";
import { picturesReducer } from "../slices/pictures";
import { authorsReducer } from "../slices/authors";
import { locationsReducer } from "../slices/locations";
import { queryReducer } from "../slices/query";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    modal: modalReducer,
    pictures: picturesReducer,
    authors: authorsReducer,
    locations: locationsReducer,
    query: queryReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
