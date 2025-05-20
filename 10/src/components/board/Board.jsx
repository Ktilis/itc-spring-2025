import classes from './Board.module.css'
import { Row } from './Row';
import { Cell } from './Cell';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { positionSlice } from '../../store/slices/position';
import { bindSlice } from '../../store/slices/bind';

const range = () => [ 0, 1, 2 ];

export const Board = () => {
  const dispatch = useDispatch();
  const { moveDir } = positionSlice.actions;
  const { getBinds } = bindSlice.selectors;
  const binds = useSelector(getBinds);
  const { up, down, left, right } = binds;

  const keyDownListener = (e) => {
    console.log("1");
    for(const key in binds) {
      const value = binds[key];
      if(value === e.code) dispatch(moveDir({direction: key.toUpperCase()}));
    }
  };
  useEffect(() => {
    console.log('useEffect');

    document.addEventListener('keydown', keyDownListener);

    return () => document.removeEventListener('keydown', keyDownListener);
  }, [binds]);

  return (
    <div className={classes.board}>
      {
        range().map((row, rowI) => {
          return (
            <Row key={rowI}>
              { range().map((column, colI) => <Cell row={row} column={column} key={colI} />) }
            </Row>
          )
        })
      }
    </div>
  );
}
