import React from 'react';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

import {Props} from './types';

const Pagination: React.FC<Props> = ({handlePrev, handleNext, currentNumber, allNumbers, loading}) => (
  <Stack direction="row" alignItems="center" justifyContent="center" sx={{mt: 3}}>
    <IconButton onClick={handlePrev} color="primary" disabled={loading}>
      <ChevronLeftIcon />
    </IconButton>
    {!loading ? (
      <Chip label={currentNumber + ' of ' + allNumbers} variant="outlined" color="primary" sx={{ml: 1, mr: 1}} />
    ) : (
      <Skeleton variant="rectangular" animation="wave" width={58} height={32} sx={{borderRadius: 8, ml: 1, mr: 1}} />
    )}
    <IconButton onClick={handleNext} color="primary" disabled={loading}>
      <ChevronRightIcon />
    </IconButton>
  </Stack>
);

export default Pagination;
