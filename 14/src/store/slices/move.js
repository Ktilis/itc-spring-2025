import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  source: null,
}

export const moveSlice = createSlice({
  name: 'move',
  initialState,
  reducers: {
    setSource: (state, action) => {
    },
    dropSource: (state) => {
    },
  },
  selectors: {
  },
});
