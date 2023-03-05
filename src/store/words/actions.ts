import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {Word} from 'models/Word';

export const fetchWords = createAsyncThunk('words/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<Word[]>('/data/word_and_sentences.json');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load data');
  }
});
