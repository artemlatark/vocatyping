import {User} from '@firebase/auth';

export interface Props {
  user: User;
  signOut: () => void;
}
