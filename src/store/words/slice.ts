import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

import {fetchDictionary} from './actionCreators';
import {State} from './types';

const initialState: State = {
  entities: [],
  loading: LoadingStatus.idle,
  error: null,
};

export const wordsSlice = createSlice({
  name: 'words',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDictionary.pending.type, (state) => {
        state.loading = LoadingStatus.pending;
      })
      .addCase(fetchDictionary.fulfilled.type, (state, action: PayloadAction<Word[]>) => {
        state.entities = action.payload;
        state.loading = LoadingStatus.succeeded;
        state.error = initialState.error;
      })
      .addCase(fetchDictionary.rejected.type, (state, action: PayloadAction<Error>) => {
        state.loading = LoadingStatus.failed;
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
