import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {State} from './types';

const initialState: State = {
  writtenText: '',
  currentWordId: getFromLocalStorage('currentWord'),
  tenseIndex: 0,
  tenseVariants: [],
  tenseVariantIndex: 0,
};

export const currentWordSlice = createSlice({
  name: 'currentWord',
  initialState,
  reducers: {
    initWord(state, action: PayloadAction<string>) {
      const word = action.payload;

      state.tenseVariants = word.split('').map((letter, index, thisArg) => ({
        correct: false,
        variant: thisArg
          .slice(0, index + 1)
          .join('')
          .toLowerCase(),
      }));
    },
    onWriteText(state, action: PayloadAction<string>) {
      state.writtenText = action.payload;
    },
    onCheckInputLetter(state, action: PayloadAction<string>) {
      const index = action.payload.length - 1;
      const letter = action.payload.at(-1);
      const currentWordVariant = state.tenseVariants[state.tenseVariantIndex].variant[index];

      if (currentWordVariant === undefined || letter !== currentWordVariant.toLowerCase()) {
        state.tenseVariants.map((item) => (item.correct = false));

        state.writtenText = '';
        state.tenseVariantIndex = 0;
      }
    },
    onCheckEnteredWord(state) {
      state.tenseVariants[state.tenseVariantIndex].correct = true;

      state.writtenText = '';
      state.tenseVariantIndex++;
    },
    onNextTense(state) {
      state.writtenText = '';
      state.tenseVariantIndex = 0;
      state.tenseIndex++;
    },
    onChangeWord(state, action: PayloadAction<string>) {
      state.writtenText = '';
      state.tenseVariantIndex = 0;
      state.tenseIndex = 0;

      state.currentWordId = action.payload;
      saveToLocalStorage('currentWord', action.payload);
    },
  },
});

export default currentWordSlice.reducer;
