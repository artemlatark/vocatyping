import React from 'react';
import cx from 'classnames';

import {SpreadOutWordItemProps} from '../types';
import styles from '../index.module.css';

const SpreadOutWordItem: React.FC<SpreadOutWordItemProps> = React.memo(({item}) => {
  const variantCheckedClassNames = cx({
    [styles.checked]: item.correct,
  });

  return <span className={variantCheckedClassNames}>{item.variant}</span>;
});

export default SpreadOutWordItem;
