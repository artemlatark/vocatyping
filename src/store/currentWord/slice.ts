import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Word} from 'models/Word';

import {State} from './types';

const currentWordId_LS: State['currentWordIndex'] = getFromLocalStorage('currentWordId');

const initialState: State = {
  writtenText: '',
  currentWord: undefined,
  currentWordId: currentWordId_LS ?? 0,
  currentWordIndex: currentWordId_LS ? currentWordId_LS - 1 : 0,
  tenseIndex: 0,
  tenseVariants: [],
  tenseVariantIndex: 0,
};

export const currentWordSlice = createSlice({
  name: 'currentWord',
  initialState,
  reducers: {
    setCurrentWord(state, action: PayloadAction<Word>) {
      state.currentWord = action.payload;
    },
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

        state.writtenText = initialState.writtenText;
        state.tenseVariantIndex = initialState.tenseVariantIndex;
      }
    },
    onCheckEnteredWord(state) {
      state.tenseVariants[state.tenseVariantIndex].correct = true;

      state.writtenText = initialState.writtenText;
      state.tenseVariantIndex++;
    },
    onNextTense(state) {
      state.writtenText = initialState.writtenText;
      state.tenseVariantIndex = initialState.tenseVariantIndex;
      state.tenseIndex++;
    },
    onChangeWord(state, action: PayloadAction<number>) {
      state.writtenText = initialState.writtenText;
      state.tenseVariantIndex = initialState.tenseVariantIndex;
      state.tenseIndex = initialState.tenseIndex;

      state.currentWordId = action.payload;
      state.currentWordIndex = action.payload - 1;
      saveToLocalStorage('currentWordId', action.payload);
    },
  },
});

export default currentWordSlice.reducer;
