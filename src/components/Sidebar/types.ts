import {State} from '../../store/words/types';

export interface Props extends Pick<State, 'words'> {
  currentWordId: number;
  onOpenSidebar: (value?: boolean) => void;
  sidebarOpen: boolean;
}
