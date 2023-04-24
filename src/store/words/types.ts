import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

export interface State {
  words: Word[];
  loading: LoadingStatus;
  error: Error | null;
}
