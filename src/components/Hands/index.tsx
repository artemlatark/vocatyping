import React, {FC, useEffect, useState, memo} from 'react';
import classNames from 'classnames';

import {NextTypeKey} from '../../models/IKeyboard';

import styles from './index.module.css';

interface HandsProps {
  nextTypeKey: NextTypeKey;
}

const Hands: FC<HandsProps> = memo(({nextTypeKey}) => {
  const [translateCoords, setTranslateCoords] = useState<number[]>([0, 0]);
  const translateOffset = {
    left: /[1-4]/.test(nextTypeKey.finger.toString()) ? 46 : 60,
    top: 42,
  };

  const handClassNames = classNames(styles.hand, styles[`hand-${nextTypeKey.finger}`]);
  const handInlineStyles: React.CSSProperties = {
    transform: `translate(${translateCoords[0]}px, ${translateCoords[1]}px)`,
  };

  useEffect(() => {
    const left = Math.round(nextTypeKey.coords.left + nextTypeKey.coords.width - translateOffset.left);
    const top = Math.round(nextTypeKey.coords.top + translateOffset.top);

    setTranslateCoords([left, top]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextTypeKey]);

  return <div className={handClassNames} style={handInlineStyles} />;
});

export default Hands;
