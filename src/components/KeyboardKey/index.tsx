import React, {useEffect, useRef} from 'react';

import cx from 'classnames';

import {useWindowSize} from 'hooks/useWindowSize';

import styles from './index.module.css';
import {Props} from './types';

const KeyboardKey: React.FC<Props> = React.memo(({keyboardKey, nextKey, handleChangeNextTypeKey, currentWordId}) => {
  const windowSizes = useWindowSize();
  const keyRef = useRef<HTMLDivElement | null>(null);
  const isNextKey = keyboardKey.key?.toLowerCase() === nextKey?.toLowerCase();

  const keyClassNames = cx(styles.key, {
    [styles[`${keyboardKey.code?.toLowerCase()}`]]: keyboardKey.code,
    [styles.supKey]: keyboardKey.supKey,
    [styles.isSystemKey]: keyboardKey.isSystemKey,
    [styles.isSpace]: keyboardKey.isSpace,
    [styles.needType]: isNextKey,
  });

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
    <div className={keyClassNames} ref={keyRef}>
      {keyboardKey.key}
      {keyboardKey.supKey && <span>{keyboardKey.supKey}</span>}
    </div>
  );
});

export default KeyboardKey;
