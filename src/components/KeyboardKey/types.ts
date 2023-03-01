import {Key, NextTypeKey} from '../../models/Keyboard';
import {State} from '../../store/currentWord/types';

export type Props = {
  keyboardKey: Key;
  nextKey: string | undefined;
  onChangeNextTypeKey: (obj: NextTypeKey | null) => void;
} & Pick<State, 'currentWordId'>;
