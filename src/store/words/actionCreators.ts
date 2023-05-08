import axios from 'axios';
import csv from 'csvtojson';

import {createAsyncThunk} from '@reduxjs/toolkit';
import {ref, getDownloadURL} from 'firebase/storage';

import {firebaseStorage} from 'config/firebase';

import {initWord} from 'store/currentWord/slice';

import {Word} from 'models/Word';

interface FetchDictionaryArgs {
  initialWordId: number;
}

export const fetchDictionary = createAsyncThunk('words/fetchDictionary', async ({initialWordId}: FetchDictionaryArgs, {dispatch, rejectWithValue}) => {
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

    dispatch(initWord(dictionary[initialWordId]));

    return dictionary;
  } catch (error) {
    const rejectError: Error = {name: 'unknown error', message: 'An unknown error occurred. Failed to load data.'};

    if (error instanceof Error) {
      rejectError.name = error.name;
      rejectError.message = error.message;
    }

    return rejectWithValue(rejectError);
  }
});
