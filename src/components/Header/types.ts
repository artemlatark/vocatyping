import {Word} from 'models/Word';
import {State} from 'store/currentWord/types';

export interface Props extends Pick<State, 'currentWordId' | 'currentWordTense'> {
  onOpenSidebar: (value?: boolean) => void;
  wordNumbers: number;
  currentWord: Word | undefined;
}
