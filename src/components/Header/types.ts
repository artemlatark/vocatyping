import {State as CurrentWordState} from 'store/currentWord/types';
import {State as WordsState} from 'store/words/types';

export interface Props extends Pick<WordsState, 'words'>, Pick<CurrentWordState, 'currentWordId'> {
  onOpenSidebar: (value?: boolean) => void;
  wordNumbers: number;
}
