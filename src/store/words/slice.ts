import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

import {fetchWordsInDictionary} from './actionCreators';
import {State} from './types';

const initialState: State = {
  words: [],
  loading: LoadingStatus.idle,
  error: null,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWordsInDictionary.pending.type, (state) => {
        state.loading = LoadingStatus.pending;
      })
      .addCase(fetchWordsInDictionary.fulfilled.type, (state, action: PayloadAction<Word[]>) => {
        state.words = action.payload;
        state.loading = LoadingStatus.succeeded;
        state.error = initialState.error;
      })
      .addCase(fetchWordsInDictionary.rejected.type, (state, action: PayloadAction<Error>) => {
        state.loading = LoadingStatus.failed;
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
