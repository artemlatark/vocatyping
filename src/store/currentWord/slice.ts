import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getFromLocalStorage, saveToLocalStorage} from 'utils';
import {State, ChangeWordPayloadAction} from './types';

const initialState: State = {
  currentWordId: getFromLocalStorage('currentWord') || 1,
  writtenText: '',
  currentWordTense: 0,
  wordVariants: [],
  currentVariantIndex: 0,
};

export const currentWordSlice = createSlice({
  name: 'currentWord',
  initialState,
  reducers: {
    initWord(state, action: PayloadAction<string>) {
      const word = action.payload;

      state.wordVariants = word.split('').map((letter, index, thisArg) => ({
        correct: false,
        variant: thisArg.slice(0, index + 1).join(''),
      }));
    },
    onWriteText(state, action: PayloadAction<string>) {
      state.writtenText = action.payload;
    },
    onCheckInputLetter(state, action: PayloadAction<string>) {
      const index = action.payload.length - 1;
      const letter = action.payload.at(-1);

      if (
        state.wordVariants[state.currentVariantIndex].variant[index] === undefined ||
        letter !== state.wordVariants[state.currentVariantIndex].variant[index].toLowerCase()
      ) {
        state.wordVariants.map((item) => (item.correct = false));

        state.writtenText = '';
        state.currentVariantIndex = 0;
      }
    },
    onCheckEnteredWord(state) {
      state.wordVariants[state.currentVariantIndex].correct = true;

      state.writtenText = '';
      state.currentVariantIndex++;
    },
    onNextTense(state) {
      state.writtenText = '';
      state.currentVariantIndex = 0;
      state.currentWordTense++;
    },
    onChangeWord(state, action: PayloadAction<ChangeWordPayloadAction>) {
      state.writtenText = '';
      state.currentVariantIndex = 0;
      state.currentWordTense = 0;

      switch (action.payload.handlerType) {
        case 'prev':
          if (state.currentWordId === 1) break;

          state.currentWordId--;
          break;
        case 'next':
          if (state.currentWordId === action.payload.wordNumbers) break;

          state.currentWordId++;
          break;
        default:
          state.currentWordId = action.payload.wordId || 1;
      }

      saveToLocalStorage('currentWord', state.currentWordId);
    },
  },
});

export default currentWordSlice.reducer;
