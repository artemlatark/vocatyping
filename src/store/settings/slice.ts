import {getFromLocalStorage, saveToLocalStorage} from 'utils';

import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {defaultPronunciationSpeed, defaultThemeMode, defaultVoiceURI} from 'config/settings';

import {State} from './types';

const currentVoiceURI_LS: State['voiceURI'] = getFromLocalStorage('voiceURI');
const currentPronunciationSpeed_LS: State['pronunciationSpeed'] = getFromLocalStorage('pronunciationSpeed');
const currentThemeMode_LS: State['themeMode'] = getFromLocalStorage('themeMode');

export const initialState: State = {
  voiceURI: currentVoiceURI_LS ?? defaultVoiceURI,
  pronunciationSpeed: currentPronunciationSpeed_LS ?? defaultPronunciationSpeed,
  themeMode: currentThemeMode_LS ?? defaultThemeMode,
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setVoice(state, action: PayloadAction<State['voiceURI']>) {
      state.voiceURI = action.payload;
      saveToLocalStorage('voiceURI', action.payload);
    },
    setPronunciationSpeed(state, action: PayloadAction<State['pronunciationSpeed']>) {
      state.pronunciationSpeed = action.payload;
      saveToLocalStorage('pronunciationSpeed', action.payload);
    },
    setThemeMode(state, action: PayloadAction<State['themeMode']>) {
      state.themeMode = action.payload;
      saveToLocalStorage('themeMode', action.payload);
    },
  },
});

export const {setVoice, setPronunciationSpeed, setThemeMode} = settingsSlice.actions;

export default settingsSlice.reducer;
