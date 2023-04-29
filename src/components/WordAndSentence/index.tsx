import React, {useMemo} from 'react';

import {useAppSelector} from 'hooks/redux';
import {useSpeechSynthesis} from 'hooks/useSpeechSynthesis';

import SentencesOfWord from './components/SentencesOfWord';
import SpreadOutWord from './components/SpreadOutWord';
import TensesOfWord from './components/TensesOfWord';
import styles from './index.module.css';
import {WordAndSentenceProps} from './types';

const WordAndSentence: React.FC<WordAndSentenceProps> = React.memo(({typeFormInputRef}: any) => {
  const {currentWord, tenseIndex, tenseVariants, tenseVariantIndex} = useAppSelector((state) => state.currentWordReducer);
  const {isSpeaking, speak, cancelSpeaking, voices} = useSpeechSynthesis();
  const voice = useMemo(() => voices.find((item) => item.name === 'Google US English'), [voices]);

  return (
    <div className={styles.wordAndSentence}>
      <TensesOfWord currentWord={currentWord} tenseIndex={tenseIndex} speech={{isSpeaking, speak, cancelSpeaking}} voice={voice} typeFormInputRef={typeFormInputRef} />
      <SentencesOfWord currentWord={currentWord} speech={{isSpeaking, speak, cancelSpeaking}} voice={voice} />
      <SpreadOutWord tenseVariants={tenseVariants} tenseVariantIndex={tenseVariantIndex} />
    </div>
  );
});

export default WordAndSentence;
