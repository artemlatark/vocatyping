import axios from 'axios';
import csv from 'csvtojson';

import {createAsyncThunk} from '@reduxjs/toolkit';
import {ref, getDownloadURL} from 'firebase/storage';

import {firebaseStorage} from 'config/firebase';

import {Word} from 'models/Word';

export const fetchWordsInDictionary = createAsyncThunk('words/fetchAll', async (_, thunkAPI) => {
  try {
    const dictionaryRef = ref(firebaseStorage, 'dictionaries/shestov.csv');

    const dictionaryDownloadURL = await getDownloadURL(dictionaryRef);

    const response = await axios.get(dictionaryDownloadURL);

    const dictionary: Word[] = await csv({
      ignoreEmpty: true,
      colParser: {
        id: 'number',
      },
    }).fromString(response.data);

    return dictionary;
  } catch (error) {
    const responseError: Error =
      error instanceof Error
        ? error
        : {
            name: 'unknown error',
            message: 'An unknown error occurred. Failed to load data.',
          };

    return thunkAPI.rejectWithValue(responseError);
  }
});
