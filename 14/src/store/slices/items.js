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
    moveItem: (state, action) => {
      const pl = action.payload;

      const source = pl.source;
      const dest = pl.dest;

      // Перемещаем элемент из source в dest
      state[dest].unshift(
          state[source].shift()
      );
    },
  },
  selectors: {
    getItems: (state) => state,
  },
});
