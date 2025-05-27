import { createSlice, createSelector } from '@reduxjs/toolkit'

const initialState = {
  currentFigure: 'rook',
  knightPosition: {
    row: 0,
    column: 0,
  },
  rookPosition: {
    row: 3,
    column: 7,
  },
}

const maxRow = 4 - 1;
const maxColumn = 8 - 1;

const validateRookMove = (currentPos, figurePos) => {
  return currentPos.row === figurePos.row || currentPos.column === figurePos.column;
}

const validateKnightMove = (currentPos, figurePos) => {
  const dx = Math.abs(figurePos.column - currentPos.column);
  const dy = Math.abs(figurePos.row - currentPos.row);

  return dx * dy === 2;
}

export const figuresSlice = createSlice({
  name: 'figures',
  initialState,
  reducers: {
    setToPosition: (state, action) => {
      const pl = action.payload;

      const row = pl.row;
      const column = pl.column;

      let wouldMove = false;
      switch(state.currentFigure) {
        case 'rook': {
          wouldMove = validateRookMove({ column, row }, state.rookPosition) 
            && !validateKnightMove({ column, row }, state.knightPosition);
          break;
        }
        case 'knight': {
          wouldMove = validateKnightMove({ column, row }, state.knightPosition)
            && !validateRookMove({ column, row }, state.rookPosition);
          break;
        }
      }

      if(!wouldMove) return;

      state[`${state.currentFigure}Position`].row = row;
      state[`${state.currentFigure}Position`].column = column;

      state.currentFigure = state.currentFigure === 'knight' ? 'rook' : 'knight';
    }
  },
  selectors: {
    getCurrentFigure: (state) => state.currentFigure,
    getRookPosition: (state) => state.rookPosition,
    getKnightPosition: (state) => state.knightPosition,
  },
});
