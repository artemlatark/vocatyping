import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Word} from 'models/Word';

import {getTenseIndex, makeTenseVariants, spreadSentencesByWords} from './helpers';
import {State} from './types';

const currentWordId_LS: State['currentWordIndex'] = getFromLocalStorage('currentWordId');

export const initialState: State = {
  writtenText: '',
  currentWord: undefined,
  currentWordId: currentWordId_LS ?? 1,
  currentWordIndex: currentWordId_LS ? currentWordId_LS - 1 : 0,
  tenseIndex: 0,
  tenseVariants: [],
  tenseVariantIndex: 0,
  isTenseVariantCorrectlyTyped: false,
};

export const currentWordSlice = createSlice({
  name: 'currentWord',
  initialState,
  reducers: {
    initWord(state, action: PayloadAction<Word>) {
      const currentWord = action.payload;

      // Spreading sentences into object with words
      const sentencesByWords = spreadSentencesByWords(currentWord.sentences);
      // Array with indexes of sentences in which the first match of each tense was found
      const tenseIndex = getTenseIndex(currentWord.tenses, sentencesByWords);

      state.currentWord = action.payload;
      state.tenseIndex = tenseIndex;
      state.tenseVariants = makeTenseVariants(currentWord.tenses, tenseIndex);
    },
    writeText(state, action: PayloadAction<string>) {
      state.writtenText = action.payload;
    },
    checkTenseVariant(state, action: PayloadAction<string>) {
      const variantLetterIndex = action.payload.length - 1;
      const currentTenseVariant = state.tenseVariants[state.tenseVariantIndex].variant.toLowerCase();
      const currentTenseVariantLetter = currentTenseVariant[variantLetterIndex];

      // Commented lines are needed to break the `correct` parameter in all tense variants if at least once tense variant was typed incorrectly
      if (currentTenseVariantLetter === undefined || state.writtenText !== currentTenseVariant.slice(0, state.writtenText.length)) {
        // state.tenseVariants.map((item) => (item.correct = false));
        state.tenseVariants[state.tenseVariantIndex].correct = false;

        state.writtenText = initialState.writtenText;
        // state.tenseVariantIndex = initialState.tenseVariantIndex;
        // state.isTenseVariantCorrectlyTyped = initialState.isTenseVariantCorrectlyTyped;
      }

      if (state.writtenText === currentTenseVariant) {
        state.tenseVariants[state.tenseVariantIndex].correct = true;
        state.tenseVariantIndex++;

        state.writtenText = initialState.writtenText;
      }

      if (state.tenseVariants.at(-1)?.correct) {
        state.isTenseVariantCorrectlyTyped = true;
      }
    },
    changeTense(state, action: PayloadAction<number>) {
      if (state.currentWord) {
        state.tenseIndex = action.payload;
        state.tenseVariants = makeTenseVariants(state.currentWord.tenses, action.payload);
      }

      state.writtenText = initialState.writtenText;
      state.tenseVariantIndex = initialState.tenseVariantIndex;
      state.isTenseVariantCorrectlyTyped = initialState.isTenseVariantCorrectlyTyped;
    },
    changeWord(state, action: PayloadAction<number>) {
      state.currentWordId = action.payload;
      state.currentWordIndex = action.payload - 1;
      saveToLocalStorage('currentWordId', action.payload);

      state.writtenText = initialState.writtenText;
      state.tenseIndex = initialState.tenseIndex;
      state.tenseVariantIndex = initialState.tenseVariantIndex;
      state.isTenseVariantCorrectlyTyped = initialState.isTenseVariantCorrectlyTyped;
    },
  },
});

export const {initWord, writeText, checkTenseVariant, changeTense, changeWord} = currentWordSlice.actions;

export default currentWordSlice.reducer;
