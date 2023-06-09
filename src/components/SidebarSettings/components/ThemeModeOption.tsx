import React from 'react';

import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/LightMode';
import SettingsBrightnessIcon from '@mui/icons-material/SettingsBrightness';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setThemeMode} from 'store/settings/slice';
import {State as StateReducerSettings} from 'store/settings/types';

import {OptionsContainer, TitleContainer} from '../styles';

const ThemeModeOption = () => {
  const dispatch = useAppDispatch();
  const {themeMode} = useAppSelector((state) => state.settingsReducer);
  const [themeModeOption, setThemeModeOption] = React.useState<StateReducerSettings['themeMode']>(themeMode);

  const handleChange = (event: React.MouseEvent<HTMLElement>, themeMode: StateReducerSettings['themeMode']) => {
    if (!themeMode) return;

    setThemeModeOption(themeMode);
    dispatch(setThemeMode(themeMode));
  };

  return (
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
  );
};

export default React.memo(ThemeModeOption);
