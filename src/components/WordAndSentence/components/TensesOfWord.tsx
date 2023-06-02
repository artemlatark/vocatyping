import React from 'react';

import cx from 'classnames';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';

import {useAppDispatch} from 'hooks/redux';

import {changeTense, checkTenseVariant} from 'store/currentWord/slice';

import {useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import styles from '../index.module.css';
import {TensesOfWordProps} from '../types';

const TensesOfWord: React.FC<TensesOfWordProps> = React.memo(({currentWord, tenseIndex}) => {
  const dispatch = useAppDispatch();
  const {speechSynthesis} = useSpeechSynthesisContext();

  const onSpeechWord = (): void => {
    if (speechSynthesis?.isSpeaking) {
      speechSynthesis?.cancelSpeaking();
    }

    speechSynthesis?.speak({
      text: currentWord?.tenses[tenseIndex],
      voice: speechSynthesis?.selectedVoice,
      rate: 1,
    });
  };

  const handleSelectTenseVariant = (tenseIndex: number): void => {
    if (speechSynthesis?.isSpeaking) {
      speechSynthesis?.cancelSpeaking();
    }

    dispatch(changeTense(tenseIndex));
    dispatch(checkTenseVariant(''));
  };

  return (
    <div className={styles.tensesOfWord}>
      {currentWord?.tenses.map((tense, index, thisArg) => (
        <React.Fragment key={tense}>
          <button onClick={() => handleSelectTenseVariant(index)} className={cx(styles.tenseVariant, {[styles.currentTenseVariant]: index === tenseIndex})}>
            {tense}
          </button>
          {index !== thisArg.length - 1 ? ', ' : null}
        </React.Fragment>
      ))}
      <IconButton onClick={() => onSpeechWord()} color="primary" size="small" sx={{mt: -1, ml: 1}}>
        <VolumeUpIcon />
      </IconButton>
    </div>
  );
});

export default TensesOfWord;
