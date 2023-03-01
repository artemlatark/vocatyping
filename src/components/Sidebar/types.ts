import {State} from '../../store/words/types';

export type Props = {
  currentWordId: number;
  onOpenSidebar: (value?: boolean) => void;
  sidebarWidth: number;
  sidebarOpen: boolean;
} & Pick<State, 'words'>;
