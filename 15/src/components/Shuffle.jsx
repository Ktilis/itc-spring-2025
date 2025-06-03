import classes from './Shuffle.module.css'
import { useDispatch } from 'react-redux';
import { bonesSlice } from '../store/slices/bones'

export const Shuffle = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    // TODO: подключить action и отправить на выполнение
  }

  return (
    <div>
      <button onClick={handleClick} className={classes.button}>Перемешать</button>
    </div>
  )
}
