import {Word} from 'models/Word';

export interface State {
  words: Word[];
  isLoading: boolean;
  error: Error | null;
}
