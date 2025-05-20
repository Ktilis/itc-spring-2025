import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  green: {
    row: 0, column: 0, value: 10,
  },
  orange: {
    row: 6, column: 6, value: 10,
  }
}

const canMove = (row, column) => {
  return {
    up: row > 0,
    down: row < 8-2,
    left: column > 0,
    right: column < 8-2,
  }
}

export const boxesSlice = createSlice({
  name: "boxes",
  initialState,
  reducers: {
    moveBox: (state, action) => {
      const pl = action.payload;
      state[pl.box].row = pl.row;
      state[pl.box].column = pl.column;
    }
  },
  selectors: {
    getGreenBox: (state) => state.green,
    getOrangeBox: (state) => state.orange,
    canMove: (state) => {
      return {
        green: canMove(state.green.row, state.green.column),
        orange: canMove(state.orange.row, state.orange.column),
      }
    }
  }
});
