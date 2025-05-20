import classes from './Bindings.module.css'
import { Bind } from './Bind'
import { useEffect } from 'react'
import { bindSlice } from '../../store/slices/bind';
import { useDispatch } from 'react-redux';
import { positionSlice } from '../../store/slices/position';

export const Bindings = () => {
  const { setBind } = bindSlice.actions;
  const { setPause } = positionSlice.actions;
  const dispatch = useDispatch();

  // https://ru.react.dev/reference/react/useEffect
  useEffect(() => {
    const bindHandler = (e) => {
      const key = e.code;
      dispatch(setBind(key));
      dispatch(setPause(false));
    }

    document.addEventListener('keydown', bindHandler);

    // Это функция вызываемая при удалении объекта
    return () => document.removeEventListener('keydown', bindHandler);
  }, []);

  return (
    <div className={classes.bindings}>
      <Bind direction="up" />
      <Bind direction="down" />
      <Bind direction="left" />
      <Bind direction="right" />
    </div>
  )
}
