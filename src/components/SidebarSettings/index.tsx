import React, {useState} from 'react';

import CloseIcon from '@mui/icons-material/Close';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Typography from '@mui/material/Typography';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setThemeMode, setVoice} from 'store/settings/slice';
import {State as StateReducerSettings} from 'store/settings/types';

import {SpeechSynthesisContextState, useSpeechSynthesisContext} from 'context/SpeechSynthesisContext';

import {OptionsContainer, TitleContainer} from './styles';
import {SidebarProps} from './types';

const SidebarSettings: React.FC<SidebarProps> = React.memo(({isOpen, handleOpen}) => {
  const dispatch = useAppDispatch();
  const {currentVoiceURI, themeMode} = useAppSelector((state) => state.settingsReducer);
  const {speechSynthesis, setSpeechSynthesis} = useSpeechSynthesisContext();
  const [voiceForSpeech, setVoiceForSpeech] = useState<StateReducerSettings['currentVoiceURI']>(currentVoiceURI);
  const [themeModeOption, setThemeModeOption] = React.useState<StateReducerSettings['themeMode']>(themeMode ?? 'system');

  const handleChangeVoice = ({target}: SelectChangeEvent) => {
    const selectedVoiceURI = target.value;
    const voices = speechSynthesis?.voices as SpeechSynthesisVoice[];
    const selectedVoice = voices.find((voice) => voice.name === selectedVoiceURI) ?? voices[0];

    setVoiceForSpeech(selectedVoiceURI);
    setSpeechSynthesis((prevState) => ({...prevState, selectedVoice} as SpeechSynthesisContextState));
    dispatch(setVoice(selectedVoiceURI));
  };

  const handleChange = (event: React.MouseEvent<HTMLElement>, themeMode: StateReducerSettings['themeMode']) => {
    if (themeMode) {
      setThemeModeOption(themeMode);
      dispatch(setThemeMode(themeMode));
    }
  };

  return (
    <Drawer anchor="right" onClose={() => handleOpen('settings')} open={isOpen} PaperProps={{sx: {width: 370}}}>
      <Grid sx={{padding: 2}} justifyContent="space-between" container>
        <Typography variant="h4">Settings</Typography>
        <IconButton onClick={() => handleOpen('settings')}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
      <Box sx={{pt: 4, pl: 2, pr: 2}}>
        <OptionsContainer>
          <TitleContainer variant="subtitle2" gutterBottom>
            Voice for speech
          </TitleContainer>
          <FormControl fullWidth>
            <Select value={voiceForSpeech} onChange={handleChangeVoice}>
              {speechSynthesis?.voices.map((voice) => (
                <MenuItem key={voice.voiceURI} value={voice.voiceURI} selected={voice.voiceURI === voiceForSpeech}>
                  {voice.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </OptionsContainer>
        <OptionsContainer>
          <TitleContainer variant="subtitle2" gutterBottom>
            Theme mode
          </TitleContainer>
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
        </OptionsContainer>
      </Box>
    </Drawer>
  );
});

export default SidebarSettings;
