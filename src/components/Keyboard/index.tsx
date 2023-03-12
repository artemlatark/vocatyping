import React, {useState, useCallback, useMemo} from 'react';

import KeyboardKey from 'components/KeyboardKey';
import Hands from 'components/Hands';
import {keyboardLayout, NextTypeKey} from 'models/Keyboard';
import {Props} from './types';

import styles from './index.module.css';

import keyboards from 'data/keyboards.json';

const Keyboard: React.FC<Props> = React.memo(({writtenText, currentWordId, wordVariants, currentVariantIndex}) => {
  const [nextTypeKey, setNextTypeKey] = useState<NextTypeKey | null>(null);
  const currentLayout: keyboardLayout = keyboardLayout.MAC;
  const keyboardObj = useMemo(
    () => keyboards.find((keyboard) => keyboard.layoutKey === currentLayout),
    [currentLayout]
  );
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
        {keyboardObj?.keys.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className={styles.keyLine}>
            {line.map((key, keyIndex) => (
              <KeyboardKey
                key={`key-${key}-${keyIndex}`}
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
