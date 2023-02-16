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
import {useAppDispatch} from '../../hooks/redux';

import styles from './index.module.css';

const itemKey = (index: number, data: any) => data[index].id;

interface WordItemProps {
  currentWordId: number;
  onOpenSidebar: (value?: boolean) => void;
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
  onOpenSidebar: (value?: boolean) => void;
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
  const listRef = useRef<any>(null);

  const scrollToItem = () => {
    if (listRef.current && sidebarOpen) {
      listRef.current.scrollToItem(currentWordId - 1, 'smart');
    }
  };

  return (
    <AutoSizer className={styles.sidebar}>
      {({height}) => (
        <Drawer
          className={styles.sidebarWrapper}
          variant="temporary"
          anchor="left"
          open={sidebarOpen}
          onClose={() => onOpenSidebar()}
          SlideProps={{
            addEndListener: scrollToItem,
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
    </AutoSizer>
  );
};

export default memo(Sidebar);
