import React, {useState, useCallback, useMemo, memo} from 'react';

import KeyboardKey from '../KeyboardKey';
import Hands from '../Hands';
import {keyboardLayout, NextTypeKey} from '../../models/Keyboard';
import {State as CurrentWordState} from '../../store/currentWord/types';

import styles from './index.module.css';

import keyboards from '../../data/keyboards.json';

type Props = Pick<CurrentWordState, 'writtenText' | 'currentWordId' | 'wordVariants' | 'currentVariantIndex'>;

const Keyboard: React.FC<Props> = memo(({writtenText, currentWordId, wordVariants, currentVariantIndex}) => {
  const [nextTypeKey, setNextTypeKey] = useState<NextTypeKey | null>(null);
  const currentLayout: keyboardLayout = keyboardLayout.MAC;
  const keyboard = useMemo(() => keyboards.find((keyboard) => keyboard.layoutKey === currentLayout), [currentLayout]);
  const currentWordVariant = useMemo(
    () => wordVariants.find((item, index) => index === currentVariantIndex),
    [currentVariantIndex, wordVariants]
  );
  const nextKey = currentWordVariant?.variant[writtenText.length];

  const onChangeNextTypeKey = useCallback((obj: NextTypeKey | null) => setNextTypeKey(obj), []);

  return (
    <div className={styles.keyboard}>
      {nextTypeKey ? <Hands nextTypeKey={nextTypeKey} /> : null}
      <div>
        {keyboard?.keys.map((line, index) => (
          <div key={index} className={styles.keyLine}>
            {line.map((key, index) => (
              <KeyboardKey
                key={index}
                keyboardKey={key}
                nextKey={nextKey}
                onChangeNextTypeKey={onChangeNextTypeKey}
                currentWordId={currentWordId}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Keyboard;
