import React, {useState} from 'react';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Chip from '@mui/material/Chip';

import {Progress, ProgressShell, GoalAchievedContainer, GoalAchievedProgressContainer, GoalAchievedText, GoalAchievedTextContainer, TimerForStudyCointainer} from './styles';

const DailyTrainingTimer = () => {
  const [timerOn, setTimerOn] = useState(false);

  const handleToggleTimerOn = () => {
    setTimerOn((prevState) => !prevState);
  };

  const handleResetTimer = () => {
    console.info('You clicked the delete icon.');
  };

  return (
    <TimerForStudyCointainer sx={{marginLeft: '16px !important'}}>
      <GoalAchievedContainer sx={{mr: 1}}>
        <GoalAchievedProgressContainer>
          <ProgressShell variant="determinate" value={100} />
          <Progress variant="determinate" value={10} />
        </GoalAchievedProgressContainer>
        <GoalAchievedTextContainer>
          <GoalAchievedText variant="caption" color="text.secondary">{`${Math.round(10)}%`}</GoalAchievedText>
        </GoalAchievedTextContainer>
      </GoalAchievedContainer>
      <Chip
        avatar={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
        label="00:30:00"
        variant="outlined"
        onClick={handleToggleTimerOn}
        onDelete={handleResetTimer}
        deleteIcon={<RestartAltIcon />}
        sx={{ml: 1, mr: 1}}
      />
    </TimerForStudyCointainer>
  );
};

export default DailyTrainingTimer;
