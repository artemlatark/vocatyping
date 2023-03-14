import {CurrentWord} from 'models/Word';
import {State as WordsState} from 'store/words/types';
import {State as CurrentWordState} from 'store/currentWord/types';

export interface Props extends CurrentWord, Pick<WordsState, 'isLoading'>, CurrentWordState {
  wordNumbers: number;
}
