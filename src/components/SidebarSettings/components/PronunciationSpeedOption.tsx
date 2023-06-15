import {SyntheticEvent, useState} from 'react';

import Slider from '@mui/material/Slider';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {setPronunciationSpeed} from 'store/settings/slice';
import {State as StateReducerSettings} from 'store/settings/types';

import {OptionsContainer, TitleContainer} from '../styles';

const PronunciationSpeedOption = () => {
  const dispatch = useAppDispatch();
  const {pronunciationSpeed} = useAppSelector((state) => state.settingsReducer);
  const [pronunciationSpeedOption, setPronunciationSpeedOption] = useState<StateReducerSettings['pronunciationSpeed']>(pronunciationSpeed);

  const handleChange = (event: Event, value: number | number[]) => {
    if (Array.isArray(value)) return;

    setPronunciationSpeedOption(value);
  };

  const handleChangeCommitted = (event: SyntheticEvent | Event, value: number | number[]) => {
    if (Array.isArray(value)) return;

    dispatch(setPronunciationSpeed(value));
  };

  return (
    <OptionsContainer>
      <TitleContainer variant="subtitle2" gutterBottom>
        Pronunciation speed
      </TitleContainer>
      <Slider
        onChange={handleChange}
        onChangeCommitted={handleChangeCommitted}
        aria-label="Pronunciation speed"
        value={pronunciationSpeedOption}
        valueLabelDisplay="auto"
        step={0.1}
        min={0.1}
        max={1}
        marks
      />
    </OptionsContainer>
  );
};

export default PronunciationSpeedOption;
