import React from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import Typography from '@mui/material/Typography';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setVoice} from 'store/options/slice';

import {SpeechSynthesisContextStateType, useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import styles from './index.module.css';
import {SidebarProps} from './types';

const SidebarOptions: React.FC<SidebarProps> = React.memo(({isOpen, handleOpen}) => {
  const dispatch = useAppDispatch();
  const {currentVoiceURI} = useAppSelector((state) => state.optionsReducer);
  const {speechSynthesisCtx, setSpeechSynthesisCtx} = useSpeechSynthesisContext();
  const [voiceForSpeech, setVoiceForSpeech] = React.useState<string>(currentVoiceURI);

  const handleChange = ({target}: SelectChangeEvent) => {
    const selectedVoiceURI = target.value;
    const voices = speechSynthesisCtx?.voices as SpeechSynthesisVoice[];
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceURI);

    setVoiceForSpeech(selectedVoiceURI);
    dispatch(setVoice(selectedVoiceURI));
    setSpeechSynthesisCtx((prevState) => ({...prevState, selectedVoice} as SpeechSynthesisContextStateType));
  };

  return (
    <Drawer anchor="right" onClose={() => handleOpen('options')} open={isOpen}>
      <div className={styles.wrapper}>
        <Box sx={{mt: 6, mb: 8, ml: 4, mr: 4}}>
          <Typography variant="h4" sx={{mb: 4}}>
            Options
          </Typography>
          <FormControl fullWidth>
            <InputLabel>Voice for speech</InputLabel>
            <Select value={voiceForSpeech} label="Voice for speech" onChange={handleChange}>
              {speechSynthesisCtx?.voices.map((voice) => (
                <MenuItem key={voice.voiceURI} value={voice.voiceURI} selected={voice.voiceURI === voiceForSpeech}>
                  {voice.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </div>
    </Drawer>
  );
});

export default SidebarOptions;
