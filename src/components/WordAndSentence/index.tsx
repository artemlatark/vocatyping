import React from 'react';

import {WordVariant} from 'models/WordVariant';
import {Props} from './types';
import TensesOfWordItem from './TensesOfWordItem';
import SpreadOutWordItem from './SpreadOutWordItem';

import styles from './index.module.css';

const WordAndSentence: React.FC<Props> = React.memo(
  ({currentWord, currentWordTense, wordVariants, currentVariantIndex}) => {
    return (
      <div className={styles.wordAndSentence}>
        <div className={styles.tensesOfWord}>
          {currentWord?.tenses.map((tense, index, thisArg) => (
            <TensesOfWordItem
              key={tense}
              tense={tense}
              index={index}
              thisArg={thisArg}
              currentWordTense={currentWordTense}
            />
          ))}
        </div>
        <div className={styles.sentenceOfWord}>{currentWord?.sentence}</div>
        <div className={styles.wordAndSentenceContent}>
          <div className={styles.spreadOutWord}>
            {wordVariants.map((item: WordVariant, index) =>
              currentVariantIndex >= index ? <SpreadOutWordItem key={item.variant} item={item} /> : null
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default WordAndSentence;
