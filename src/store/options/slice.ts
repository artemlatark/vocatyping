import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {defaultVoiceURI} from 'config/options';

import {State} from './types';

const currentVoice_LS: State['currentVoiceURI'] = getFromLocalStorage('currentVoiceURI');

export const initialState: State = {
  currentVoiceURI: currentVoice_LS ?? defaultVoiceURI,
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setVoice(state, action: PayloadAction<State['currentVoiceURI']>) {
      state.currentVoiceURI = action.payload;
      saveToLocalStorage('currentVoiceURI', action.payload);
    },
  },
});

export const {setVoice} = optionsSlice.actions;

export default optionsSlice.reducer;
