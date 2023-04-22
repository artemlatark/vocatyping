import React from 'react';

import {TenseVariant} from 'models/Word';

import SpreadOutWordItem from './SpreadOutWordItem';
import styles from '../index.module.css';
import {SpreadOutWordProps} from '../types';

const SpreadOutWord: React.FC<SpreadOutWordProps> = React.memo(({tenseVariants, tenseVariantIndex}) => (
  <div className={styles.wordAndSentenceContent}>
    <div className={styles.spreadOutWord}>
      {tenseVariants.map((item: TenseVariant, index) => (tenseVariantIndex >= index ? <SpreadOutWordItem key={item.variant} item={item} /> : null))}
    </div>
  </div>
));

export default SpreadOutWord;
