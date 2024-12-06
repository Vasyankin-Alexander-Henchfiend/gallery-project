import { createSlice } from "@reduxjs/toolkit";
import { TLocation } from "../../components/types/types";



type TLocationsState = {
    locations: TLocation[]
}

const initialState: TLocationsState = {
    locations: []
}

const locationsSlice = createSlice({
    name: 'locations',
    initialState,
    reducers: {
        getLocations: (state, action) => {
            state.locations = action.payload
        },
    }
})

export const { getLocations } = locationsSlice.actions;
export const locationsReducer = locationsSlice.reducer;