import React from 'react';

import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import DailyTrainingGoal from './components/DailyTrainingGoal';
import PronunciationSpeedOption from './components/PronunciationSpeedOption';
import ThemeModeOption from './components/ThemeModeOption';
import VoiceForSpeechOption from './components/VoiceForSpeechOption';
import {SidebarProps} from './types';

const SidebarSettings: React.FC<SidebarProps> = ({isOpen, handleOpen}) => {
  return (
    <Drawer anchor="right" onClose={() => handleOpen('settings')} open={isOpen} PaperProps={{sx: {width: 370}}}>
      <Grid sx={{padding: 2, pl: 4, pr: 4}} justifyContent="space-between" container>
        <Typography variant="h4">Settings</Typography>
        <IconButton onClick={() => handleOpen('settings')}>
          <CloseIcon />
        </IconButton>
      </Grid>
      <Divider />
      <Box sx={{padding: 4}}>
        <VoiceForSpeechOption />
        <PronunciationSpeedOption />
        <DailyTrainingGoal />
        <ThemeModeOption />
      </Box>
    </Drawer>
  );
};

export default React.memo(SidebarSettings);
