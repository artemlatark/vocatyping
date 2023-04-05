import {createAsyncThunk} from '@reduxjs/toolkit';
import {collection, getDocs, orderBy, query} from 'firebase/firestore';

import {db} from 'config/firebase';

const collectionRef = collection(db, '/dictionaries/wmHSUtOX4Ar50I6uOsXi/words');

export const fetchWordsInDictionary = createAsyncThunk('words/fetchAll', async (_, thunkAPI) => {
  try {
    const querySnapshot = query(collectionRef, orderBy('word', 'asc'));
    // const response = await axios.get<Word[]>('/data/word_and_sentences.json');

    const response = await getDocs(querySnapshot);
    const entities: any = response.docs.map((doc) => ({id: doc.id, ...doc.data(), createdAt: '1'}));

    return entities;
  } catch (error) {
    return thunkAPI.rejectWithValue('Failed to load data');
  }
});
