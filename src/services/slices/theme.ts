import { createSlice } from '@reduxjs/toolkit'

type TypeTheme = {
  theme: 'dark' | 'light'
}

const initialState: TypeTheme = {
  theme: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    getTheme: (state, action) => {
      state.theme = action.payload
    },
  },
})

export const { getTheme } = themeSlice.actions
export const themeReducer = themeSlice.reducer
