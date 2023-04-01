import React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';

import {Props} from './types';

const Pagination: React.FC<Props> = ({handlePrev, handleNext, currentNumber, allNumbers}) => (
  <>
    <IconButton onClick={handlePrev} color="primary">
      <ChevronLeftIcon />
    </IconButton>
    <Chip label={currentNumber + ' of ' + allNumbers} variant="outlined" color="primary" sx={{ml: 1, mr: 1}} />
    <IconButton onClick={handleNext} color="primary">
      <ChevronRightIcon />
    </IconButton>
  </>
);

export default Pagination;
