import { createSlice } from '@reduxjs/toolkit'
import { TPicture } from '../../components/types/types'

type TPicturesState = {
  pictures: TPicture[]
}

const initialState: TPicturesState = {
  pictures: [],
}

const picturesSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    getPictures: (state, action) => {
      state.pictures = action.payload
    },
  },
})

export const { getPictures } = picturesSlice.actions
export const picturesReducer = picturesSlice.reducer
