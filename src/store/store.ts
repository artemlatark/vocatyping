import {combineReducers, configureStore} from '@reduxjs/toolkit';

import currentWordSlice from './currentWord/slice';
import settingsSlice from './settings/slice';
import wordsSlice from './words/slice';

const rootReducer = combineReducers({
  currentWordReducer: currentWordSlice,
  settingsReducer: settingsSlice,
  wordsReducer: wordsSlice,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
