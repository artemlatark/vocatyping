import {Word} from '../../../models/Word';

export type Props = {
  word: Word;
  index: number;
  currentWordId: number;
  onOpenSidebar: (value?: boolean) => void;
};
