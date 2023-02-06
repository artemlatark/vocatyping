import {IWord, WordState} from '../../models/IWord';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchWords} from './ActionCreators';

//continue from page 23
const initialState: WordState = {
  words: [],
  isLoading: false,
  error: '',
};

export const wordSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWords.pending.type, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchWords.fulfilled.type, (state, action: PayloadAction<IWord[]>) => {
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

export default wordSlice.reducer;
