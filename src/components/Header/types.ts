import {State} from 'store/currentWord/types';

export interface Props extends Pick<State, 'currentWordId'> {
  onOpenSidebar: (value?: boolean) => void;
  wordNumbers: number;
}
