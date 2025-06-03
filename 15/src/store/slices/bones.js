import { createSlice, createSelector } from '@reduxjs/toolkit'

const swap = (array, pos, diff) => {
  const tmp = array[pos];
  array[pos] = array[pos + diff];
  array[pos + diff] = tmp;

  return array;
}

const shuffleBones = () => {
  const bones = Array(15).fill(0).map((_, i) => i + 1);
  const result = bones // [];
  // TODO: перемешать фишки из bones в result

  result.push(0);

  return result;
}

const initialState = () => {
  return {
    bones: shuffleBones(),
  }
}

const getBones = (state) => state.bones;

const getMoves = createSelector(
  getBones,
  (bones) => {
    const moves = {};
    bones.forEach((bone, index) => {
      // TODO: определить, в каком направлении может двигаться фишка
    });

    return moves;
  }
);

const getSolved = createSelector(
  getBones,
  (bones) => {
    let solved = true;
    // TODO: определить, решена ли головоломка
    return solved;
  }
);

export const bonesSlice = createSlice({
  name: 'bones',
  initialState,
  reducers: {
    moveBone: (state, action) => {
      const { bone, direction } = action.payload;

      // TODO: переместить фишку в указанном направлении
    },
    shuffleBones: (state) => {
      state.bones = shuffleBones();
    },
  },
  selectors: {
    getBones,
    getMoves,
    getSolved,
  }
});
