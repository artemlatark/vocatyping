import React, {memo} from 'react';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';

import TensesOfWordItem from './TensesOfWordItem';

import {TensesOfWordProps} from '../types';
import styles from '../index.module.css';

const TensesOfWord: React.FC<TensesOfWordProps> = memo(({currentWord, currentWordTense, speak, voice}) => {
  const onSpeechWord = (): void => {
    speak({text: currentWord?.tenses[currentWordTense], voice, rate: 0.8});
  };

  return (
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
      <IconButton onClick={() => onSpeechWord()} aria-label="menu" color="primary" size="small" sx={{mt: -1, ml: 1}}>
        <VolumeUpIcon />
      </IconButton>
    </div>
  );
});

export default TensesOfWord;
