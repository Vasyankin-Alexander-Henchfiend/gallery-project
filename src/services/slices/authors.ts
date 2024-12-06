import { createSlice } from "@reduxjs/toolkit";
import { TAuthor } from "../../components/types/types";


type TAuthorsState = {
    authors: TAuthor[]
}

const initialState: TAuthorsState = {
    authors: []
}

const authorsSlice = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        getAuthors: (state, action) => {
            state.authors = action.payload
        },
    }
})

export const { getAuthors } = authorsSlice.actions;
export const authorsReducer = authorsSlice.reducer;