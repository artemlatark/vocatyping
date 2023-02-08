import React, {FC, memo, useRef} from 'react';
import classNames from 'classnames';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {FixedSizeList as List, ListChildComponentProps, areEqual} from 'react-window';
import ListItemButton from '@mui/material/ListItemButton';
import AutoSizer from 'react-virtualized-auto-sizer';
import {WordState} from '../../models/IWord';
import {checkTextSlice} from '../../store/reducers/CheckTextSlice';

import styles from './index.module.css';
import {useAppDispatch} from '../../hooks/redux';

const itemKey = (index: number, data: any) => data[index].id;

interface WordItemProps {
  currentWordId: number;
  onOpenSidebar: () => void;
}

const WordItem = memo(({currentWordId, onOpenSidebar, data, index, style}: WordItemProps & ListChildComponentProps) => {
  const dispatch = useAppDispatch();
  const word = data[index];

  const wordItemClassNames = classNames({
    [styles.itemCurrent]: index + 1 === currentWordId,
  });

  const onChangeWord = () => {
    onOpenSidebar();
    dispatch(checkTextSlice.actions.onChangeWord({wordId: word.id}));
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

interface SidebarProps {
  currentWordId: number;
  onOpenSidebar: () => void;
  sidebarWidth: number;
  sidebarOpen: boolean;
}

type WordStatePick = Pick<WordState, 'words'>;

const Sidebar: FC<SidebarProps & WordStatePick> = ({
  currentWordId,
  onOpenSidebar,
  sidebarOpen,
  sidebarWidth,
  words,
}) => {
  const listRef = useRef(null);
  // const wordsByLetter = useMemo(() => {
  //   const letters = englishAlphabet;
  //
  //   return words;
  // }, [words]);

  console.log(1);

  return (
    <AutoSizer className={styles.sidebar}>
      {({height}) => (
        <Drawer
          className={styles.sidebarWrapper}
          variant="temporary"
          anchor="left"
          open={sidebarOpen}
          onClose={onOpenSidebar}
          SlideProps={{
            addEndListener: () => {
              if (listRef.current) {
                // @ts-ignore
                listRef.current.scrollToItem(currentWordId - 1, 'center');
              }
            },
          }}
        >
          <List
            ref={listRef}
            height={height}
            width={sidebarWidth}
            itemSize={48}
            itemData={words}
            itemKey={itemKey}
            itemCount={words.length}
            overscanCount={5}
          >
            {(props) => <WordItem currentWordId={currentWordId} onOpenSidebar={onOpenSidebar} {...props} />}
          </List>
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

export default memo(Sidebar);
