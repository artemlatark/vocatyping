import {combineReducers, configureStore} from '@reduxjs/toolkit';
import wordReducer from './reducers/WordSlice';
import writtenTextCheckReducer from './reducers/CheckTextSlice';

const rootReducer = combineReducers({
  wordReducer,
  writtenTextCheckReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
