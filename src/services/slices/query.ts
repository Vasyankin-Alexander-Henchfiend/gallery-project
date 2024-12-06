import { createSlice } from "@reduxjs/toolkit";


type TQuery = {
  query: string;
  authorId?: number;
  locationId?: number;
  yearFrom: string;
  yearTo: string;
};

const initialState: TQuery = {
  query: "",
  authorId: undefined,
  locationId: undefined,
  yearFrom: '',
  yearTo: '',
};

const querySlice = createSlice({
  name: "query",
  initialState,
  reducers: {
    getQuery: (state, action) => {
      state.query = action.payload;
    },
    getAuthorId: (state, action) => {
      state.authorId = action.payload;
    },
    getLocationId: (state, action) => {
      state.locationId = action.payload;
    },
    removeAllQueryData: (state) => {
      state.authorId = undefined;
      state.locationId = undefined;
      state.yearFrom = '';
      state.yearTo = '';
    },
  },
});

export const { getQuery, getAuthorId, getLocationId, removeAllQueryData } = querySlice.actions;
export const queryReducer = querySlice.reducer;