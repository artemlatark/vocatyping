import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {Word} from 'models/Word';
import {State} from './types';
import {fetchWords} from './actions';

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
      .addCase(fetchWords.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWords.fulfilled.type, (state, action: PayloadAction<Word[]>) => {
        state.isLoading = false;
        state.error = '';
        state.words = action.payload;
      })
      .addCase(fetchWords.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default wordsSlice.reducer;
