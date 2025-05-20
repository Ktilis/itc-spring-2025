import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { bindSlice } from '../../store/slices/bind'
import classes from './Bind.module.css'
import { positionSlice } from '../../store/slices/position';

export const Bind = ({ direction }) => {
  const dispatch = useDispatch();
  const { getBinds, getDirection } = bindSlice.selectors;
  const { setBind, selectDirection } = bindSlice.actions;
  const { setPause } = positionSlice.actions;
  const cdirection = useSelector(getDirection);
  const binds = useSelector(getBinds);
  const bind = binds[direction];
  const waiting = direction === cdirection;

  const handleClick = () => {
    dispatch(selectDirection(direction));
    dispatch(setPause(true));

    // const func = (e) => {
    //   document.removeEventListener('keydown', func);

    //   console.log(e.code);
    //   console.log(`${cdirection} === ${direction} = ${cdirection===direction}`);

    //   if(cdirection !== direction) {
    //     return;
    //   }

    //   dispatch(setBind(e.code));
    //   dispatch(selectDirection(null));
    //   //dispatch(setPause(false));
    // }

    // dispatch(selectDirection(direction));
    // //dispatch(setPause(true));
    // document.addEventListener('keydown', func);
  }

  return (
    <div className={classes.bind} onClick={handleClick}>
      { direction.toLocaleUpperCase() }:&nbsp;
      { bind }

      { waiting ? <span className={classes.waiting}>waiting</span> : null }
    </div>
  )
}
