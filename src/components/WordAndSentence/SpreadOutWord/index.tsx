import React from 'react';

import {WordVariant} from 'models/WordVariant';

import SpreadOutWordItem from './SpreadOutWordItem';
import {Props} from './types';
import styles from '../index.module.css';

const SpreadOutWord: React.FC<Props> = React.memo(({wordVariants, currentVariantIndex}) => (
  <div className={styles.wordAndSentenceContent}>
    <div className={styles.spreadOutWord}>
      {wordVariants.map((item: WordVariant, index) =>
        currentVariantIndex >= index ? <SpreadOutWordItem key={item.variant} item={item} /> : null
      )}
    </div>
  </div>
));

export default SpreadOutWord;
