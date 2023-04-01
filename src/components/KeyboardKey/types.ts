import {Key, NextTypeKey} from 'models/Keyboard';
import {State} from 'store/currentWord/types';

export interface Props extends Pick<State, 'currentWordId'> {
  keyboardKey: Key;
  nextKey: string | undefined;
  onChangeNextTypeKey: (obj?: NextTypeKey) => void;
}
