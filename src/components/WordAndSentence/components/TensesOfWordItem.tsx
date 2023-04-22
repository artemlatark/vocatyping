import React, {Fragment, memo} from 'react';

import cx from 'classnames';

import styles from '../index.module.css';
import {TensesOfWordItemProps} from '../types';

const TensesOfWordItem: React.FC<TensesOfWordItemProps> = memo(({tense, index, thisArg, tenseIndex}) => {
  const currentWordClassNames = cx({
    [styles.current]: index === tenseIndex,
  });

  return (
    <Fragment key={tense}>
      <span className={currentWordClassNames}>{tense}</span>
      {index !== thisArg.length - 1 ? ', ' : null}
    </Fragment>
  );
});

export default TensesOfWordItem;
