import React, {useMemo} from 'react';

import {useSpeechSynthesis} from 'hooks/useSpeechSynthesis';

import SentenceOfWord from './components/SentenceOfWord';
import SpreadOutWord from './components/SpreadOutWord';
import TensesOfWord from './components/TensesOfWord';
import styles from './index.module.css';
import {WordAndSentenceProps} from './types';

const WordAndSentence: React.FC<WordAndSentenceProps> = React.memo(({currentWord, currentWordTense, wordVariants, currentVariantIndex}) => {
  const {speak, voices} = useSpeechSynthesis();
  const voice = useMemo(() => voices.find((item) => item.name === 'Google US English'), [voices]);

  return (
    <div className={styles.wordAndSentence}>
      <TensesOfWord currentWord={currentWord} currentWordTense={currentWordTense} speak={speak} voice={voice} />
      <SentenceOfWord currentWord={currentWord} speak={speak} voice={voice} />
      <SpreadOutWord wordVariants={wordVariants} currentVariantIndex={currentVariantIndex} />
    </div>
  );
});

export default WordAndSentence;
