import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getFromLocalStorage, saveToLocalStorage, splitWordIntoLetters} from '../../shared/utils';
import {ChangeWordAction, CheckText} from '../../models/CheckText';

const initialState: CheckText = {
  currentWordId: getFromLocalStorage('currentWord') || 1,
  writtenText: '',
  currentWordTense: 0,
  wordVariants: [],
  currentVariantIndex: 0,
};

export const checkTextSlice = createSlice({
  name: 'writtenTextCheck',
  initialState,
  reducers: {
    initWord(state, action: PayloadAction<string>) {
      state.wordVariants = splitWordIntoLetters(action.payload);
    },
    onWriteText(state, action: PayloadAction<string>) {
      state.writtenText = action.payload;
    },
    onCheckInputLetter(state, action: PayloadAction<string>) {
      const index = action.payload.length - 1;
      const letter = action.payload.at(-1);

      if (letter !== state.wordVariants[state.currentVariantIndex].variant[index]) {
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
    onChangeWord(state, action: PayloadAction<ChangeWordAction>) {
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

export default checkTextSlice.reducer;
