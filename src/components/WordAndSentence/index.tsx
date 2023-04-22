import React, {useMemo} from 'react';

import {useSpeechSynthesis} from 'hooks/useSpeechSynthesis';

import SentencesOfWord from './components/SentencesOfWord';
import SpreadOutWord from './components/SpreadOutWord';
import TensesOfWord from './components/TensesOfWord';
import styles from './index.module.css';
import {WordAndSentenceProps} from './types';

const WordAndSentence: React.FC<WordAndSentenceProps> = React.memo(({currentWord, tenseIndex, tenseVariants, tenseVariantIndex}) => {
  const {speak, voices} = useSpeechSynthesis();
  const voice = useMemo(() => voices.find((item) => item.name === 'Google US English'), [voices]);

  return (
    <div className={styles.wordAndSentence}>
      <TensesOfWord currentWord={currentWord} tenseIndex={tenseIndex} speak={speak} voice={voice} />
      <SentencesOfWord currentWord={currentWord} speak={speak} voice={voice} />
      <SpreadOutWord tenseVariants={tenseVariants} tenseVariantIndex={tenseVariantIndex} />
    </div>
  );
});

export default WordAndSentence;
