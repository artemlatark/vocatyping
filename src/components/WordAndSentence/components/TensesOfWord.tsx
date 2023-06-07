import React from 'react';

import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import IconButton from '@mui/material/IconButton';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {changeTense, checkTenseVariant} from 'store/currentWord/slice';

import {useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import {TensesOfWordContainer, TenseVariantButton} from '../styles';
import {TensesOfWordProps} from '../types';

const TensesOfWord: React.FC<TensesOfWordProps> = ({currentWord, tenseIndex}) => {
  const dispatch = useAppDispatch();
  const {pronunciationSpeed} = useAppSelector((state) => state.settingsReducer);
  const {speechSynthesis} = useSpeechSynthesisContext();

  const onSpeechWord = (): void => {
    if (speechSynthesis?.isSpeaking) {
      speechSynthesis?.cancelSpeaking();
    }

    speechSynthesis?.speak({
      text: currentWord?.tenses[tenseIndex],
      voice: speechSynthesis?.selectedVoice,
      rate: pronunciationSpeed,
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
    <TensesOfWordContainer>
      {currentWord?.tenses.map((tense, index, thisArg) => (
        <React.Fragment key={tense}>
          <TenseVariantButton onClick={() => handleSelectTenseVariant(index)} selected={index === tenseIndex}>
            {tense}
          </TenseVariantButton>
          {index !== thisArg.length - 1 ? ', ' : null}
        </React.Fragment>
      ))}
      <IconButton onClick={() => onSpeechWord()} color="primary" size="small" sx={{mt: -1, ml: 1}}>
        <VolumeUpIcon />
      </IconButton>
    </TensesOfWordContainer>
  );
};

export default React.memo(TensesOfWord);
