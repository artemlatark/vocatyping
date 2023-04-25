import React, {Fragment, memo} from 'react';

import cx from 'classnames';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';

import styles from '../index.module.css';
import {TensesOfWordProps} from '../types';

const TensesOfWord: React.FC<TensesOfWordProps> = memo(({currentWord, tenseIndex, speech: {isSpeaking, speak, cancelSpeaking}, voice}) => {
  const onSpeechWord = (): void => {
    if (isSpeaking) cancelSpeaking();
    speak({text: currentWord?.tenses[tenseIndex], voice, rate: 0.8});
  };

  return (
    <div className={styles.tensesOfWord}>
      {currentWord?.tenses.map((tense, index, thisArg) => (
        <Fragment key={tense}>
          <span className={cx({[styles.current]: index === tenseIndex})}>{tense}</span>
          {index !== thisArg.length - 1 ? ', ' : null}
        </Fragment>
      ))}
      <IconButton onClick={() => onSpeechWord()} color="primary" size="small" sx={{mt: -1, ml: 1}}>
        <VolumeUpIcon />
      </IconButton>
    </div>
  );
});

export default TensesOfWord;
