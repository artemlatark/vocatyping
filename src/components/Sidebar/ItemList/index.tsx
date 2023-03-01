import {FC, memo} from 'react';
import {areEqual} from 'react-window';
import cx from 'classnames';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';

import {useAppDispatch} from '../../../hooks/redux';
import {currentWordSlice} from '../../../store/currentWord/slice';
import {Props as WordItemProps} from './types';

import styles from '../index.module.css';

const ItemList: FC<WordItemProps> = memo(({currentWordId, onOpenSidebar, data, index, style}) => {
  const dispatch = useAppDispatch();
  const word = data[index];

  const wordItemClassNames = cx({
    [styles.itemCurrent]: index + 1 === currentWordId,
  });

  const onChangeWord = () => {
    onOpenSidebar();
    dispatch(currentWordSlice.actions.onChangeWord({wordId: word.id}));
  };

  return (
    <ListItem style={style} key={word.id} component="div" disablePadding>
      <ListItemButton onClick={() => onChangeWord()}>
        <ListItemText>
          <span className={wordItemClassNames}>{word.tenses.join(', ')}</span>
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
}, areEqual);

export default ItemList;
