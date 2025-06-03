import classes from './Board.module.css'
import { bonesSlice } from '../store/slices/bones';
import { useSelector } from 'react-redux'
import { Bone, BlankBone } from './Bone'

const { getBones } = bonesSlice.selectors;

export const Board = () => {
  const bones = useSelector(getBones);
  return (
    <div className={classes.board}>
      { bones.map((bone) => bone !== 0 ? <Bone number={bone} /> : <BlankBone />) }
    </div>
  )
}
