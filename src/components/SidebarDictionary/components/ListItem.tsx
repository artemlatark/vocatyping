import React, {useMemo} from 'react';

import ListItemText from '@mui/material/ListItemText';

import {useAppDispatch} from 'hooks/redux';

import {changeWord, initWord} from 'store/currentWord/slice';

import {ListItemButtonCustom} from '../styles';
import {ListItemProps} from '../types';

const ListItem: React.FC<ListItemProps> = ({word, index, currentWordId, handleOpenSidebar}) => {
  const dispatch = useAppDispatch();
  const currentItem = useMemo(() => (currentWordId ? word.id === currentWordId : index === 0), [currentWordId, index, word.id]);

  const onChangeWord = (): void => {
    handleOpenSidebar('dictionary');

    dispatch(changeWord(word.id));
    dispatch(initWord(word));
  };

  return (
    <ListItemButtonCustom onClick={() => onChangeWord()} role="button" selected={currentItem}>
      <ListItemText primaryTypographyProps={{sx: {fontWeight: 'inherit'}}}>{word.tenses.join(', ')}</ListItemText>
    </ListItemButtonCustom>
  );
};

export default ListItem;
