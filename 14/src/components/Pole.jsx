import { useDispatch, useSelector } from 'react-redux';
import { moveSlice } from '../store/slices/move'
import classes from './Pole.module.css'
import { itemsSlice } from '../store/slices/items';
import { Item } from './Item';

export const Pole = ({ id }) => {
  const { setSource, dropSource } = moveSlice.actions;
  const { getItems } = itemsSlice.selectors;
  const dispatch = useDispatch();

  const items = useSelector(getItems)[id] || [];

  const handleClick = () => {
  }

  const renderItems = () => {
    return items.map((itemId) => <Item number={itemId} />);
  }

  return (
    <div className={ classes.pole } onClick={handleClick}>
      { renderItems() }
    </div>
  )
}
