import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {Word} from 'models/Word';

import {fetchWordsInDictionary} from './actionCreators';
import {State} from './types';

const initialState: State = {
  words: [],
  isLoading: false,
  error: '',
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
        state.error = '';
        state.words = action.payload;
      })
      .addCase(fetchWordsInDictionary.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
