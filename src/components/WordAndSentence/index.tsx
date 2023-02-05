import {FC, Fragment, memo} from 'react';
import classNames from 'classnames';

import {IWord} from '../../models/IWord';
import {CheckText, WordVariant} from '../../models/CheckText';

import styles from './index.module.css';

interface TensesOfWordItemProps {
  tense: string;
  index: number;
  thisArg: string[];
  currentWordTense: number;
}

const TensesOfWordItem: FC<TensesOfWordItemProps> = memo(({tense, index, thisArg, currentWordTense}) => {
  const currentWordClassNames = classNames({
    [styles.current]: index === currentWordTense,
  });

  return (
    <Fragment key={tense}>
      <span className={currentWordClassNames}>{tense}</span>
      {index !== thisArg.length - 1 ? ', ' : null}
    </Fragment>
  );
});

interface SpreadOutWordItemProps {
  item: WordVariant;
}

const SpreadOutWordItem: FC<SpreadOutWordItemProps> = memo(({item}) => {
  const variantCheckedClassNames = classNames({
    [styles.checked]: item.correct,
  });

  return <span className={variantCheckedClassNames}>{item.variant}</span>;
});

interface WordAndSentenceProps {
  currentWord: IWord | undefined;
}

type CheckTextPick = Pick<CheckText, 'currentWordTense' | 'wordVariants' | 'currentVariantIndex'>;

const WordAndSentence: FC<WordAndSentenceProps & CheckTextPick> = memo(
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
