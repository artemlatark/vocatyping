import {FC, memo} from 'react';
import {Chip, IconButton} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import {useAppDispatch} from '../../hooks/redux';
import {checkTextSlice} from '../../store/reducers/CheckTextSlice';
import {WordState} from '../../models/IWord';
import {CheckText} from '../../models/CheckText';

import styles from './index.module.css';

type WordStatePick = Pick<WordState, 'words'>;
type CheckTextPick = Pick<CheckText, 'currentWordId'>;

const Navigation: FC<WordStatePick & CheckTextPick> = memo(({words, currentWordId}) => {
  const dispatch = useAppDispatch();

  const onChangeWord = (handlerType: string): void => {
    dispatch(checkTextSlice.actions.onChangeWord({handlerType, wordsNumbers: words.length}));
  };

  return (
    <div className={styles.pagination}>
      <IconButton onClick={() => onChangeWord('prev')} aria-label="left" color="primary">
        <ChevronLeftIcon />
      </IconButton>
      <Chip
        className={styles.paginationChip}
        label={currentWordId + ' of ' + words.length}
        variant="outlined"
        color="primary"
      />
      <IconButton onClick={() => onChangeWord('next')} aria-label="right" color="primary">
        <ChevronRightIcon />
      </IconButton>
    </div>
  );
});

export default Navigation;
