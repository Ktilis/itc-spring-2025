import classes from './Cell.module.css'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { Knight } from './Knight';
import { Rook } from './Rook';

import { figuresSlice } from "../store/reducers/figures"

const isSamePosition = (pos1, pos2) => {
  return pos1.row === pos2.row && pos1.column === pos2.column;
}


export const Cell = ({ column, row }) => {
  const color = (column % 2 === row % 2) ? 'white' : 'black';

  const dispatch = useDispatch();
  const { getCurrentFigure, getKnightPosition, getRookPosition } = figuresSlice.selectors;
  const { setToPosition } = figuresSlice.actions;
  const currentFigure = useSelector(getCurrentFigure);
  const knightPosition = useSelector(getKnightPosition);
  const rookPosition = useSelector(getRookPosition);
  const whichFigure = isSamePosition({ column, row }, knightPosition) ? 'knight' : 
    (isSamePosition({ column, row }, rookPosition) ? 'rook' : '');

  const handleClick = () => {
    if(whichFigure !== '') return;

    dispatch(setToPosition({row: row, column: column}));
  }

  return (
    <div className={clsx(classes.cell, classes[color], (currentFigure === whichFigure ? classes.current : ''))}
      onClick={handleClick}
    >
      { whichFigure === 'knight' && <Knight />}
      { whichFigure === 'rook' && <Rook />}
    </div>
  )
}
