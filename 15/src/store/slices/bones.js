import {createSlice, createSelector} from '@reduxjs/toolkit'

// Не использую, т.к. сделал свой способ для этого, аналогичный этому
const swap = (array, pos, diff) => {
    const tmp = array[pos];
    array[pos] = array[pos + diff];
    array[pos + diff] = tmp;

    return array;
}

/**
 *
 * @param bones {Array<Number>}
 */
const checkIsBoardSolvable = (bones) => {
    let isBoardSolvable;

    let countInversions = 0;
    bones.forEach((el, i, arr) => {
        if(i === 0) return;

        if(arr[i-1] > el)
            countInversions++;
    });

    isBoardSolvable = (countInversions + 1) % 2 === 0;

    return isBoardSolvable;
}

const shuffleBones = () => {
    const bones = Array(15).fill(0).map((_, i) => i + 1);

    let end = true;
    let result = [];
    let i = 0;

    // Т.к. только примерно половина комбинаций нерешаема, могу позволить себе сделать так
    while(end) {
        i++;
        result =
            bones.sort(() => Math.random() - 0.5); // bones;
        if(checkIsBoardSolvable(result))
            end = false;
    }

    console.log(`Shuffle board took ${i} iterations`);

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
        const blankBoneIndex = bones.findIndex(el => el === 0);

        if (blankBoneIndex - 4 >= 0)
            moves[bones[blankBoneIndex - 4]] = 'down';
        if (blankBoneIndex - 1 >= 0)
            moves[bones[blankBoneIndex - 1]] = 'left';
        if (blankBoneIndex + 4 < bones.length)
            moves[bones[blankBoneIndex + 4]] = 'down';
        if (blankBoneIndex + 1 < bones.length)
            moves[bones[blankBoneIndex + 1]] = 'right';

        return moves;
    }
);

const getSolved = createSelector(
    getBones,
    (bones) => {
        let solved = true;

        bones.forEach((bone, i) => {
            if (bone !== 0 && bone !== i + 1) solved = false;
            // console.log(bone, i + 1, bone !== i + 1);
        });

        return solved;
    }
);

export const bonesSlice = createSlice({
    name: 'bones',
    initialState,
    reducers: {
        moveBone: (state, action) => {
            const {bone, direction} = action.payload;

            let steps = 0;
            switch (direction) {
                case 'up':
                    steps = -4;
                    break;
                case 'left':
                    steps = -1;
                    break;
                case 'down':
                    steps = 4;
                    break;
                case 'right':
                    steps = 1;
                    break;
            }

            const boneIndex = state.bones.findIndex(el => el === bone);
            const blankBoneIndex = state.bones.findIndex(el => el === 0);

            state.bones[boneIndex] = 0;
            state.bones[blankBoneIndex] = bone;
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
