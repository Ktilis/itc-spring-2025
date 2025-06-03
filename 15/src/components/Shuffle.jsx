import classes from './Shuffle.module.css'
import { useDispatch } from 'react-redux';
import { bonesSlice } from '../store/slices/bones'

export const Shuffle = () => {
  const dispatch = useDispatch();
  const { shuffleBones } = bonesSlice.actions;

  const handleClick = () => {
    dispatch(shuffleBones());
  }

  return (
    <div>
      <button onClick={handleClick} className={classes.button}>Перемешать</button>
    </div>
  )
}
