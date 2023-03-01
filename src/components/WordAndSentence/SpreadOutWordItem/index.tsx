import React, {memo} from 'react';
import cx from 'classnames';

import {Props} from './types';

import styles from '../index.module.css';

const SpreadOutWordItem: React.FC<Props> = memo(({item}) => {
  const variantCheckedClassNames = cx({
    [styles.checked]: item.correct,
  });

  return <span className={variantCheckedClassNames}>{item.variant}</span>;
});

export default SpreadOutWordItem;
