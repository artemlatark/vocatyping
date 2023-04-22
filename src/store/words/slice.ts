import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Word} from 'models/Word';

import {fetchWordsInDictionary} from './actionCreators';
import {State} from './types';

const initialState: State = {
  words: [],
  isLoading: false,
  error: null,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsInDictionary.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWordsInDictionary.fulfilled.type, (state, action: PayloadAction<Word[]>) => {
        state.isLoading = false;
        state.error = null;
        state.words = action.payload;
      })
      .addCase(fetchWordsInDictionary.rejected.type, (state, action: PayloadAction<Error>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
