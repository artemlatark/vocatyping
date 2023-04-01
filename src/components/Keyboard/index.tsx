import React, {useState, useCallback, useMemo} from 'react';

import Hands from 'components/Hands';
import KeyboardKey from 'components/KeyboardKey';
import keyboards from 'data/keyboards.json';
import {keyboardLayout, NextTypeKey} from 'models/Keyboard';

import styles from './index.module.css';
import {Props} from './types';

const Keyboard: React.FC<Props> = React.memo(({writtenText, currentWordId, wordVariants, currentVariantIndex}) => {
  const [currentLayout] = useState<keyboardLayout>(keyboardLayout.MAC);
  const keyboardObj = useMemo(() => keyboards.find((keyboard) => keyboard.layoutKey === currentLayout), [currentLayout]);
  const [nextTypeKey, setNextTypeKey] = useState<NextTypeKey | undefined>(undefined);
  const currentWordVariant = wordVariants[currentVariantIndex];
  const nextKey = currentWordVariant?.variant[writtenText.length];

  const onChangeNextTypeKey = useCallback((key?: NextTypeKey) => setNextTypeKey(key), []);

  return (
    <div className={styles.keyboard}>
      {nextTypeKey ? <Hands nextTypeKey={nextTypeKey} /> : null}
      <div>
        {keyboardObj?.keys.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className={styles.keyLine}>
            {line.map((key, keyIndex) => (
              <KeyboardKey key={`key-${key}-${keyIndex}`} keyboardKey={key} nextKey={nextKey} onChangeNextTypeKey={onChangeNextTypeKey} currentWordId={currentWordId} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Keyboard;
