import React, {useState} from 'react';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setThemeMode, setVoice} from 'store/options/slice';
import {State as StateReducerOptions} from 'store/options/types';

import {SpeechSynthesisContextState, useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import styles from './index.module.css';
import {SidebarProps} from './types';

const SidebarOptions: React.FC<SidebarProps> = React.memo(({isOpen, handleOpen}) => {
  const dispatch = useAppDispatch();
  const {currentVoiceURI, themeMode} = useAppSelector((state) => state.optionsReducer);
  const {speechSynthesis, setSpeechSynthesis} = useSpeechSynthesisContext();
  const [voiceForSpeech, setVoiceForSpeech] = useState<StateReducerOptions['currentVoiceURI']>(currentVoiceURI);
  const [themeModeOption, setThemeModeOption] = React.useState<StateReducerOptions['themeMode']>(themeMode ?? 'system');

  const handleChangeVoice = ({target}: SelectChangeEvent) => {
    const selectedVoiceURI = target.value;
    const voices = speechSynthesis?.voices as SpeechSynthesisVoice[];
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceURI) ?? voices[0];

    setVoiceForSpeech(selectedVoiceURI);
    setSpeechSynthesis((prevState) => ({...prevState, selectedVoice} as SpeechSynthesisContextState));
    dispatch(setVoice(selectedVoiceURI));
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, themeMode: StateReducerOptions['themeMode']) => {
    if (themeMode) {
      setThemeModeOption(themeMode);
      dispatch(setThemeMode(themeMode));
    }
  };

  return (
    <Drawer anchor="right" onClose={() => handleOpen('options')} open={isOpen}>
      <div className={styles.wrapper}>
        <Box sx={{mt: 6, mb: 8, ml: 3, mr: 3}}>
          <Typography variant="h4" sx={{mb: 4}}>
            Options
          </Typography>
          <div className={styles.containerWithOption}>
            <FormControl fullWidth>
              <InputLabel>Voice for speech</InputLabel>
              <Select value={voiceForSpeech} label="Voice for speech" onChange={handleChangeVoice}>
                {speechSynthesis?.voices.map((voice) => (
                  <MenuItem key={voice.voiceURI} value={voice.voiceURI} selected={voice.voiceURI === voiceForSpeech}>
                    {voice.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className={styles.containerWithOption}>
            <ToggleButtonGroup value={themeModeOption} onChange={handleChange} color="primary" aria-label="Theme mode" exclusive fullWidth>
              <ToggleButton value="light">
                <LightModeIcon sx={{mr: 1}} />
                Light
              </ToggleButton>
              <ToggleButton value="system">
                <SettingsBrightnessIcon sx={{mr: 1}} />
                System
              </ToggleButton>
              <ToggleButton value="dark">
                <DarkModeOutlinedIcon sx={{mr: 1}} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
        </Box>
      </div>
    </Drawer>
  );
});

export default SidebarOptions;
