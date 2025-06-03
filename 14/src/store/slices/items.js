import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  1: [1, 2, 3],
  2: [],
  3: [],
}

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
  },
  selectors: {
    getItems: (state) => state,
  },
});
