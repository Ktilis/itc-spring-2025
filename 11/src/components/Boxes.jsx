import { useDispatch, useSelector } from "react-redux";
import { boxesSlice } from "../store/slices/boxes"
import { orderSlice } from "../store/slices/order"
import classes from './Boxes.module.css'
import { useEffect } from "react";

export const Boxes = () => {
  const { getGreenBox, getOrangeBox, canMove } = boxesSlice.selectors;
  const { moveBox } = boxesSlice.actions;
  const { getOrder } = orderSlice.selectors;
  const { next } = orderSlice.actions;
  const greenBox = useSelector(getGreenBox);
  const orangeBox = useSelector(getOrangeBox);
  const order = useSelector(getOrder);
  const dispatch = useDispatch();
  const movesAvailable = useSelector(canMove);

  const keysList = [
    'ArrowUp',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight'
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if(!keysList.includes(e.code)) return;

      const currentBoxColor = order;
      const currentBox = currentBoxColor==='green' ? greenBox : orangeBox;

      let row = currentBox.row;
      let column = currentBox.column;

      switch(e.code) {
        case 'ArrowUp': 
          if(!movesAvailable[currentBoxColor].up) break;
          row--;
          break;
        case 'ArrowDown':
          if(!movesAvailable[currentBoxColor].down) break;
          row++;
          break;
        case 'ArrowLeft':
          if(!movesAvailable[currentBoxColor].left) break;
          column--;
          break;
        case 'ArrowRight':
          if(!movesAvailable[currentBoxColor].right) break;
          column++;
          break;
        default:
          return;
      }

      // Если значения не изменились, выходим из функции
      if(row === currentBox.row && column === currentBox.column) return;

      dispatch(moveBox({box: currentBoxColor, row: row, column: column}));
      dispatch(next());
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [order, movesAvailable]);

  const renderBox = ({ color, row, column, value }) => {
    const left = (column * 100 + 20) + 'px';
    const top = (row * 100 + 20) + 'px';

    const style = {
      left,
      top,
      backgroundColor: color,
    }

    return (
      <div className={classes.box} style={style}>
        <div className={classes.title}>{ order === color ? "[" + value + "]" : value }</div>
      </div>
    )
  }

  return (
    <>
      { renderBox({ ...greenBox, color: 'green' }) }
      { renderBox({ ...orangeBox, color: 'orange' }) }
    </>
  )
}
