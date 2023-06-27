import {useRef, useState} from 'react';

import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';

import {useAppSelector} from 'hooks/redux';

import {getTime} from './helper';
import {TimerForStudyCointainer} from './styles';

const DailyTrainingTimer = () => {
  const {goal} = useAppSelector((state) => state.settings.dailyTrainingTime);
  const [timerOn, setTimerOn] = useState(false);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(goal * 60 * 1000);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleToggleTimer = (value: boolean) => {
    setTimerOn(value);

    if (value) {
      const newEndTime = Date.now() + (endTime ? timeLeft : goal * 60 * 1000);

      setEndTime(newEndTime);
      setTimeLeft(() => newEndTime - Date.now());

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(function go() {
        setTimeLeft(() => newEndTime - Date.now());

        if (newEndTime - Date.now() >= 0) {
          timerRef.current = setTimeout(go, 1000);
        } else {
          handleResetTimer();
        }
      }, 0);
    } else {
      if (timerRef.current) clearTimeout(timerRef.current);
    }
  };

  const handleResetTimer = () => {
    handleToggleTimer(false);

    setEndTime(null);
    setTimeLeft(goal * 60 * 1000);
  };

  if (goal === 0) return null;

  return (
    <>
      <Divider orientation="vertical" flexItem />
      <TimerForStudyCointainer>
        {/*<TimerForStudyCointainer sx={{marginLeft: '16px !important'}}>*/}
        {/*  <GoalAchievedContainer sx={{mr: 1}}>*/}
        {/*    <GoalAchievedProgressContainer>*/}
        {/*      <ProgressShell variant="determinate" value={100} />*/}
        {/*      <Progress variant="determinate" value={10} />*/}
        {/*    </GoalAchievedProgressContainer>*/}
        {/*    <GoalAchievedTextContainer>*/}
        {/*      <GoalAchievedText variant="caption" color="text.secondary">{`${Math.round(10)}%`}</GoalAchievedText>*/}
        {/*    </GoalAchievedTextContainer>*/}
        {/*  </GoalAchievedContainer>*/}
        <Chip
          avatar={timerOn ? <PauseIcon /> : <PlayArrowIcon />}
          label={`${getTime('hours', timeLeft)}:${getTime('minutes', timeLeft)}:${getTime('seconds', timeLeft)}`}
          variant="outlined"
          onClick={() => handleToggleTimer(!timerOn)}
          onDelete={() => handleResetTimer()}
          deleteIcon={!timerOn ? <RestartAltIcon /> : <></>}
          sx={{ml: 1, mr: 1}}
        />
      </TimerForStudyCointainer>
    </>
  );
};

export default DailyTrainingTimer;
