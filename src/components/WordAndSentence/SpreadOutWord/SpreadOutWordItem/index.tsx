import React from 'react';
import cx from 'classnames';

import {Props} from './types';
import styles from '../../index.module.css';

const SpreadOutWordItem: React.FC<Props> = React.memo(({item}) => {
  const variantCheckedClassNames = cx({
    [styles.checked]: item.correct,
  });

  return <span className={variantCheckedClassNames}>{item.variant}</span>;
});

export default SpreadOutWordItem;
