import React, {useState, useCallback, useMemo} from 'react';

import keyboards from 'data/keyboards.json';

import {useAppSelector} from 'hooks/redux';

import {keyboardLayout, NextTypeKey} from 'models/Keyboard';

import Hands from 'components/Hands';
import KeyboardKey from 'components/KeyboardKey';

import styles from './index.module.css';

const Keyboard = () => {
  const {currentWordId, writtenText, tenseVariants, tenseVariantIndex} = useAppSelector((state) => state.currentWord);
  const [currentLayout] = useState<keyboardLayout>(keyboardLayout.MAC);
  const keyboardObj = useMemo(() => keyboards.find((keyboard) => keyboard.layoutKey === currentLayout), [currentLayout]);
  const [nextTypeKey, setNextTypeKey] = useState<NextTypeKey | undefined>(undefined);
  const nextKey = tenseVariants[tenseVariantIndex]?.variant[writtenText.length];

  const handleChangeNextTypeKey = useCallback((key?: NextTypeKey) => setNextTypeKey(key), []);

  return (
    <div className={styles.keyboard}>
      {nextTypeKey && <Hands nextTypeKey={nextTypeKey} />}
      <div>
        {keyboardObj?.keys.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className={styles.keyLine}>
            {line.map((key, keyIndex) => (
              <KeyboardKey key={`key-${key}-${keyIndex}`} keyboardKey={key} nextKey={nextKey} handleChangeNextTypeKey={handleChangeNextTypeKey} currentWordId={currentWordId} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Keyboard);
