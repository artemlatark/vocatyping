import {ListChildComponentProps} from 'react-window';

export type Props = {
  currentWordId: number;
  onOpenSidebar: (value?: boolean) => void;
} & ListChildComponentProps;
