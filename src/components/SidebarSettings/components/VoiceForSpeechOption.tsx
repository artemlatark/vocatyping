import React, {useState} from 'react';

import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setVoice} from 'store/settings/slice';
import {State as StateReducerSettings} from 'store/settings/types';

import {SpeechSynthesisContextState, useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import {OptionsContainer, TitleContainer} from '../styles';

const VoiceForSpeechOption = () => {
  const dispatch = useAppDispatch();
  const {voiceURI} = useAppSelector((state) => state.settingsReducer);
  const {speechSynthesis, setSpeechSynthesis} = useSpeechSynthesisContext();
  const [voiceForSpeech, setVoiceForSpeech] = useState<StateReducerSettings['voiceURI']>(voiceURI);

  const handleChange = ({target}: SelectChangeEvent) => {
    const selectedVoiceURI = target.value;
    const voices = speechSynthesis?.voices as SpeechSynthesisVoice[];
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceURI) ?? voices[0];

    setVoiceForSpeech(selectedVoiceURI);
    setSpeechSynthesis((prevState) => ({...prevState, selectedVoice} as SpeechSynthesisContextState));
    dispatch(setVoice(selectedVoiceURI));
  };

  return (
    <OptionsContainer>
      <TitleContainer variant="subtitle2" gutterBottom>
        Voice for speech
      </TitleContainer>
      <FormControl fullWidth>
        <Select value={voiceForSpeech} onChange={handleChange}>
          {speechSynthesis?.voices.map((voice) => (
            <MenuItem key={voice.voiceURI} value={voice.voiceURI} selected={voice.voiceURI === voiceForSpeech}>
              {voice.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </OptionsContainer>
  );
};

export default VoiceForSpeechOption;
