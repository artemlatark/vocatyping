import {Word} from '../../models/Word';
import {State} from '../../store/currentWord/types';

export type Props = {
  onOpenSidebar: (value?: boolean) => void;
  wordNumbers: number;
  currentWord: Word | undefined;
} & Pick<State, 'currentWordId' | 'currentWordTense'>;
