import {FC, useEffect, useRef, memo} from 'react';
import classNames from 'classnames';

import {useWindowSize} from '../../hooks/useWindowSize';

import styles from './index.module.css';

type IKey = {
  key?: string;
  supKey?: string;
  finger?: number;
  code?: string;
  isSystemKey?: boolean;
  isSpace?: boolean;
};

interface KeyboardKeyProps {
  keyboardKey: IKey;
  nextKey: string | undefined;
  onChangeNextTypeKey: Function;
  sidebarOpen: boolean;
}

const KeyboardKey: FC<KeyboardKeyProps> = memo(({keyboardKey, nextKey, onChangeNextTypeKey, sidebarOpen}) => {
  const windowSizes = useWindowSize();
  const isNextKey = keyboardKey.key?.toLowerCase() === nextKey;
  const keyRef = useRef<HTMLDivElement>(null);

  const keyClassNames = classNames(styles.key, {
    [styles[`${keyboardKey.code?.toLowerCase()}`]]: keyboardKey.code,
    [styles.supKey]: keyboardKey.supKey,
    [styles.isSystemKey]: keyboardKey.isSystemKey,
    [styles.isSpace]: keyboardKey.isSpace,
    [styles.needType]: isNextKey,
  });

  useEffect(() => {
    if (isNextKey && keyRef.current) {
      onChangeNextTypeKey({
        finger: keyboardKey.finger,
        coords: {
          left: keyRef.current.offsetLeft,
          top: keyRef.current.offsetTop,
          width: keyRef.current.clientWidth,
        },
      });
    }

    if (nextKey === undefined) {
      onChangeNextTypeKey(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNextKey, windowSizes.width, sidebarOpen]);

  return (
    <div className={keyClassNames} ref={keyRef}>
      {keyboardKey.key}
      {keyboardKey.supKey ? <span>{keyboardKey.supKey}</span> : null}
    </div>
  );
});

export default KeyboardKey;
