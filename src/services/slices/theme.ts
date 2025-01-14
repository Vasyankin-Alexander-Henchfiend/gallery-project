import { createSlice } from '@reduxjs/toolkit'

// type TypeTheme = {
//   theme: 'dark' | 'light'
// }

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}`
  if (['light', 'dark'].includes(theme)) return theme

  const userMedia = window.matchMedia('(prefers-color-scheme: light)')
  if (userMedia.matches) return 'light'

  return 'dark'
}

const initialState = getTheme()

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    set: (_state, action) => action.payload,
  },
})

export const { set } = themeSlice.actions
export const themeReducer = themeSlice.reducer
