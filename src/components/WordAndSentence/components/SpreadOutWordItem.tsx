import React from 'react';

import cx from 'classnames';

import styles from '../index.module.css';
import {SpreadOutWordItemProps} from '../types';

const SpreadOutWordItem: React.FC<SpreadOutWordItemProps> = React.memo(({item}) => {
  const variantCheckedClassNames = cx({
    [styles.checked]: item.correct,
  });

  return <span className={variantCheckedClassNames}>{item.variant}</span>;
});

export default SpreadOutWordItem;
