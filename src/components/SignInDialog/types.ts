export interface Props {
  handleOpenClose: (value?: boolean) => void;
  isOpen: boolean;
}

export type StateDialog = 'signIn' | 'signUp';
