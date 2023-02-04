import {useState, useCallback, useMemo, memo, FC} from 'react';

import keyboards from '../../data/keyboards.json';
import {keyboardLayout, NextTypeKey} from '../../models/IKeyboard';
import {CheckText} from '../../models/CheckText';
import KeyboardKey from '../KeyboardKey';
import Hands from '../Hands';

import styles from './index.module.css';

interface Keyboard {
  sidebarOpen: boolean;
}

type CheckTextPick = Pick<CheckText, 'writtenText' | 'wordVariants' | 'currentVariantIndex'>;

const Keyboard: FC<Keyboard & CheckTextPick> = memo(({writtenText, wordVariants, currentVariantIndex, sidebarOpen}) => {
  const [nextTypeKey, setNextTypeKey] = useState<NextTypeKey | null>(null);
  const currentLayout: keyboardLayout = keyboardLayout.MAC;
  const keyboard = useMemo(() => keyboards.find((keyboard) => keyboard.layoutKey === currentLayout), [currentLayout]);
  const currentWordVariant = useMemo(
    () => wordVariants.find((item, index) => index === currentVariantIndex),
    [currentVariantIndex, wordVariants]
  );
  const nextKey = currentWordVariant?.variant[writtenText.length];

  const onChangeNextTypeKey = useCallback((obj: NextTypeKey) => setNextTypeKey(obj), []);

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
                sidebarOpen={sidebarOpen}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
});

export default Keyboard;
