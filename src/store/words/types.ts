import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

export interface State {
  entities: Word[];
  loading: LoadingStatus;
  error: Error | null;
}
