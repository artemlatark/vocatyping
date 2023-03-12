import {State as WordsState} from 'store/words/types';
import {State as CurrentWordState} from 'store/currentWord/types';
import {Word} from 'models/Word';

export interface Props extends Pick<WordsState, 'words'>, Pick<CurrentWordState, 'currentWordId'> {
  onOpenSidebar: (value?: boolean) => void;
  sidebarOpen: boolean;
  currentWord: Word | undefined;
}

export interface WordGroups {
  wordGroupsCounts: number[];
  wordGroups: string[];
}
