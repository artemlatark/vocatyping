import {Word} from 'models/Word';
import {State as WordsState} from 'store/words/types';
import {State as CurrentWordState} from 'store/currentWord/types';

export interface Props extends Pick<WordsState, 'isLoading'>, CurrentWordState {
  currentWord: Word | undefined;
  wordNumbers: number;
}
