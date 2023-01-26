import axios from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {IWord} from '../../models/IWord';

export const fetchWords = createAsyncThunk('user/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get<IWord[]>('/data/word_and_sentences.json');
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load data');
  }
});
