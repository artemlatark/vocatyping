import React from 'react';

import {WordVariant} from 'models/WordVariant';

import SpreadOutWordItem from './SpreadOutWordItem';
import styles from '../index.module.css';
import {SpreadOutWordProps} from '../types';

const SpreadOutWord: React.FC<SpreadOutWordProps> = React.memo(({wordVariants, currentVariantIndex}) => (
  <div className={styles.wordAndSentenceContent}>
    <div className={styles.spreadOutWord}>{wordVariants.map((item: WordVariant, index) => (currentVariantIndex >= index ? <SpreadOutWordItem key={item.variant} item={item} /> : null))}</div>
  </div>
));

export default SpreadOutWord;
