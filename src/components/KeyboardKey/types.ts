import {State} from 'store/currentWord/types';

import {Key, NextTypeKey} from 'models/Keyboard';

export interface Props extends Pick<State, 'currentWordId'> {
  keyboardKey: Key;
  nextKey: string | undefined;
  handleChangeNextTypeKey: (obj?: NextTypeKey) => void;
}
