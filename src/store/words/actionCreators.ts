import axios from 'axios';
import csv from 'csvtojson';

import {createAsyncThunk} from '@reduxjs/toolkit';

import {Word} from 'models/Word';

// Get a non-default Storage bucket
export const fetchWordsInDictionary = createAsyncThunk('words/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/data/shestov_dictionary.csv');

    const dictionary: Word[] = await csv({
      ignoreEmpty: true,
      colParser: {
        id: 'number',
      },
    }).fromString(response.data);

    return dictionary;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load data');
  }
});
