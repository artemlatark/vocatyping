import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {defaultThemeMode, defaultVoiceURI} from 'config/options';

import {State} from './types';

const currentVoice_LS: State['currentVoiceURI'] = getFromLocalStorage('currentVoiceURI');
const currentThemeMode_LS: State['themeMode'] = getFromLocalStorage('themeMode');

console.log(currentThemeMode_LS);

export const initialState: State = {
  currentVoiceURI: currentVoice_LS ?? defaultVoiceURI,
  themeMode: currentThemeMode_LS ?? defaultThemeMode,
};

export const optionsSlice = createSlice({
  name: 'options',
  initialState,
  reducers: {
    setVoice(state, action: PayloadAction<State['currentVoiceURI']>) {
      state.currentVoiceURI = action.payload;
      saveToLocalStorage('currentVoiceURI', action.payload);
    },
    setThemeMode(state, action: PayloadAction<State['themeMode']>) {
      state.themeMode = action.payload;
      saveToLocalStorage('themeMode', action.payload);
    },
  },
});

export const {setVoice, setThemeMode} = optionsSlice.actions;

export default optionsSlice.reducer;
