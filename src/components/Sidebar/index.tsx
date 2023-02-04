import React, {FC, useMemo} from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import {FixedSizeList, ListChildComponentProps} from 'react-window';
import ListItemButton from '@mui/material/ListItemButton';
import AutoSizer from 'react-virtualized-auto-sizer';
import {WordState} from '../../models/IWord';
import {checkTextSlice} from '../../store/reducers/CheckTextSlice';

import englishAlphabet from '../../data/englishAlphabet.json';

import styles from './index.module.css';
import {useAppDispatch} from '../../hooks/redux';

interface WordItem {
  onOpenSidebar: () => void;
}

const WordItem = ({onOpenSidebar, data, index, style}: WordItem & ListChildComponentProps) => {
  const dispatch = useAppDispatch();
  const word = data[index];

  const onChangeWord = () => {
    onOpenSidebar();
    dispatch(checkTextSlice.actions.onChangeWord({wordId: word.id}));
  };

  return (
    <ListItem style={style} key={word.id} component="div" disablePadding>
      <ListItemButton onClick={() => onChangeWord()}>
        <ListItemText>{word.tenses.join(', ')}</ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

interface SidebarProps {
  onOpenSidebar: () => void;
  sidebarWidth: number;
  sidebarOpen: boolean;
}

type WordStatePick = Pick<WordState, 'words'>;

const Sidebar: FC<SidebarProps & WordStatePick> = ({onOpenSidebar, sidebarWidth, sidebarOpen, words}) => {
  // const wordsByLetter = useMemo(() => {
  //   const letters = englishAlphabet;
  //
  //   return words;
  // }, [words]);

  return (
    <AutoSizer className={styles.sidebar}>
      {({height}) => (
        <Drawer
          className={styles.sidebarWrapper}
          variant="temporary"
          anchor="left"
          open={sidebarOpen}
          ModalProps={{
            onClose: () => onOpenSidebar(),
          }}
        >
          <FixedSizeList
            height={height}
            width={sidebarWidth}
            itemSize={48}
            itemData={words}
            itemCount={words.length}
            overscanCount={5}
          >
            {(props) => <WordItem onOpenSidebar={onOpenSidebar} {...props} />}
          </FixedSizeList>
        </Drawer>
      )}
      {/*<List subheader={<li />}>*/}
      {/*  {words.map((item) => (*/}
      {/*    <ListItem key={`item-${item.letter}-${item.tenses.join(', ')}`}>*/}
      {/*      <ListItemText primary={`${item.tenses.join(', ')}`} />*/}
      {/*    </ListItem>*/}
      {/*  ))}*/}
      {/*</List>*/}
    </AutoSizer>
  );
};

export default Sidebar;
