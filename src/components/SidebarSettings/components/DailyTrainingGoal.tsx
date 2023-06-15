import React from 'react';

import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setDailyTrainingGoal} from 'store/settings/slice';
import {State as StateReducerSettings} from 'store/settings/types';

import {OptionsContainer, TitleContainer} from '../styles';

const DailyTrainingGoal = () => {
  const dispatch = useAppDispatch();
  const {
    dailyTrainingTime: {goal: dailyTrainingGoal},
  } = useAppSelector((state) => state.settingsReducer);
  const [dailyTrainingGoalOption, setDailyTrainingGoalOption] = React.useState<StateReducerSettings['dailyTrainingTime']['goal']>(dailyTrainingGoal);

  const handleChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) return;

    setDailyTrainingGoalOption(value);
  };

  const handleChangeCommitted = (event: React.SyntheticEvent | Event, value: number | number[]) => {
    if (Array.isArray(value)) return;

    dispatch(setDailyTrainingGoal(value));
  };

  return (
    <OptionsContainer>
      <Stack direction="row" alignItems="baseline">
        <TitleContainer variant="subtitle2" gutterBottom>
          Daily training goal
        </TitleContainer>
        <Typography variant="body2" sx={{marginLeft: 'auto'}}>
          {dailyTrainingGoalOption ? `${dailyTrainingGoalOption} minutes` : 'Not set'}
        </Typography>
      </Stack>
      <Slider
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        aria-label="Daily training goal"
        value={dailyTrainingGoalOption}
        valueLabelDisplay="auto"
        step={5}
        min={0}
        max={120}
        marks
      />
    </OptionsContainer>
  );
};

export default DailyTrainingGoal;
