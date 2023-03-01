import {Word} from '../../models/Word';
import {State as WordsState} from '../../store/words/types';
import {State as CurrentWordState} from '../../store/currentWord/types';

export type Props = {
  currentWord: Word | undefined;
  wordNumbers: number;
} & Pick<WordsState, 'isLoading'> &
  CurrentWordState;
