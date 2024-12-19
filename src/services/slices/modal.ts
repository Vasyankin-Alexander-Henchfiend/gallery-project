import { createSlice } from '@reduxjs/toolkit'

type TModalState = {
  open: boolean
}

const initialState: TModalState = {
  open: false,
}

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.open = true
    },
    closeModal: (state) => {
      state.open = false
    },
  },
})

export const { openModal, closeModal } = modalSlice.actions
export const modalReducer = modalSlice.reducer
