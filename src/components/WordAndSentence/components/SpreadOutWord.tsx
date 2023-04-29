import React from 'react';

import cx from 'classnames';

import {TenseVariant} from 'models/Word';

import styles from '../index.module.css';
import {SpreadOutWordProps} from '../types';

const SpreadOutWord: React.FC<SpreadOutWordProps> = React.memo(({tenseVariants, tenseVariantIndex}) => (
  <div className={styles.wordAndSentenceContent}>
    <div className={styles.spreadOutWord}>
      {tenseVariants.map((item: TenseVariant, index) => {
        return tenseVariantIndex >= index ? (
          <span key={item.variant} className={cx({[styles.checked]: item.correct})}>
            {item.variant}
          </span>
        ) : null;
      })}
    </div>
  </div>
));

export default SpreadOutWord;
