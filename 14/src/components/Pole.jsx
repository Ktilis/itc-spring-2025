import { useDispatch, useSelector } from 'react-redux';
import clsx from 'clsx';

import { moveSlice } from '../store/slices/move'
import classes from './Pole.module.css'
import { itemsSlice } from '../store/slices/items';
import { Item } from './Item';

export const Pole = ({ id }) => {
  const { setSource, dropSource } = moveSlice.actions;
  const { getSource } = moveSlice.selectors;
  const { moveItem } = itemsSlice.actions;
  const { getItems } = itemsSlice.selectors;
  const dispatch = useDispatch();

  const items = useSelector(getItems)[id] || [];
  const boardItems = useSelector(getItems);
  const currentSelectedSource = useSelector(getSource);
  const isCurrentSourceSelected = currentSelectedSource === id;

  const handleClick = () => {
    if(isCurrentSourceSelected) {
      dispatch(dropSource());
      return;
    }

    if(items.length !== 0) {
      dispatch(setSource(id));
    }

    if(currentSelectedSource !== null) {
      if(items.length !== 0) {
        if(boardItems[currentSelectedSource][0] >= items[0]) return;
      }

      dispatch(moveItem({ source: currentSelectedSource, dest: id }));
      dispatch(dropSource());
    }
  }

  const renderItems = () => {
    return items.map((itemId) => <Item number={itemId} key={itemId} />);
  }

  return (
    <div className={ clsx(classes.pole, (isCurrentSourceSelected && classes.selected)) } onClick={handleClick}>
      { renderItems() }
    </div>
  )
}
