import React from 'react';

import cx from 'classnames';

import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import {useAppDispatch} from 'hooks/redux';

import {changeWord, initWord} from 'store/currentWord/slice';

import styles from '../index.module.css';
import {ListItemProps} from '../types';

const ListItem: React.FC<ListItemProps> = ({word, index, currentWordId, handleOpenSidebar}) => {
  const dispatch = useAppDispatch();

  const wordItemClassNames = cx({
    [styles.itemCurrent]: currentWordId ? word.id === currentWordId : index === 0,
  });

  const onChangeWord = (): void => {
    handleOpenSidebar('dictionary');

    dispatch(changeWord(word.id));
    dispatch(initWord(word));
  };

  return (
    <ListItemButton onClick={() => onChangeWord()}>
      <ListItemText>
        <span className={wordItemClassNames}>{word.tenses.join(', ')}</span>
      </ListItemText>
    </ListItemButton>
  );
};

export default ListItem;