import React, {useEffect, useRef} from 'react';

import {useWindowSize} from 'hooks/useWindowSize';

import {Key} from './styles';
import {Props} from './types';

const KeyboardKey: React.FC<Props> = React.memo(({keyboardKey, nextKey, handleChangeNextTypeKey, currentWordId}) => {
  const windowSizes = useWindowSize();
  const keyRef = useRef<HTMLDivElement | null>(null);
  const isNextKey = keyboardKey.key?.toLowerCase() === nextKey?.toLowerCase();

  useEffect(() => {
    if (isNextKey && keyRef.current) {
      handleChangeNextTypeKey({
        finger: keyboardKey.finger,
        coords: {
          left: keyRef.current.offsetLeft,
          top: keyRef.current.offsetTop,
          width: keyRef.current.clientWidth,
        },
      });
    }

    if (nextKey === undefined) {
      handleChangeNextTypeKey(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextKey, windowSizes.width, currentWordId]);

  return (
    <Key ref={keyRef} isNextKey={isNextKey} code={keyboardKey.code} isSystemKey={keyboardKey.isSystemKey} isSpace={keyboardKey.isSpace}>
      {keyboardKey.key}
      {keyboardKey.supKey && <span>{keyboardKey.supKey}</span>}
    </Key>
  );
});

export default KeyboardKey;
