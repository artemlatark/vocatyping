import {useEffect, useMemo, useState} from 'react';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import {useAppSelector} from 'hooks/redux';

import {getTimerTime} from './helper';
import {Progress, ProgressShell, GoalAchievedContainer, GoalAchievedProgressContainer, GoalAchievedText, GoalAchievedTextContainer, TimerForStudyCointainer} from './styles';

const DailyTrainingTimer = () => {
  const {goal, achieved} = useAppSelector((state) => state.settingsReducer.dailyTrainingTime);
  const [timerOn, setTimerOn] = useState(false);
  const [timerTime, setTimerTime] = useState<[string, string, string, number]>(getTimerTime(goal * 60 * 1000));

  console.log(timerTime, goal);

  const handleToggleTimer = () => {
    setTimerOn((prevState) => !prevState);
  };

  const handleResetTimer = () => {
    console.info('You clicked the delete icon.');
    handleToggleTimer();
  };

  useEffect(() => {
    if (!timerOn) {
      setTimerTime(getTimerTime(goal * 60 * 1000));
    }

    if (timerTime[3] && timerOn) {
      setTimeout(() => {
        setTimerTime((prevState) => getTimerTime(prevState[3] - 1000));
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timerOn, timerTime[3]]);

  if (goal === 0) return null;

  return (
    <>
      <Divider orientation="vertical" flexItem />
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
          label={`${timerTime[0]}:${timerTime[1]}:${timerTime[2]}`}
          variant="outlined"
          onClick={handleToggleTimer}
          onDelete={handleResetTimer}
          deleteIcon={<RestartAltIcon />}
          sx={{ml: 1, mr: 1}}
        />
      </TimerForStudyCointainer>
    </>
  );
};

export default DailyTrainingTimer;
