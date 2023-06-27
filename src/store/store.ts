import {combineReducers, configureStore} from '@reduxjs/toolkit';

import currentWordReducer from './currentWord/slice';
import settingsReducer from './settings/slice';
import wordsReducer from './words/slice';

const rootReducer = combineReducers({
  currentWord: currentWordReducer,
  settings: settingsReducer,
  words: wordsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
