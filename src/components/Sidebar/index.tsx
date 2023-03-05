import React, {useMemo, useRef} from 'react';
import {groupBy} from 'lodash';
import {GroupedVirtuoso} from 'react-virtuoso';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';

import {Props as SidebarProps} from './types';
import SidebarListItem from './ListItem';

import styles from './index.module.css';
import {ListItemCustom, ListSubheaderCustom} from './styles';

const Sidebar: React.FC<SidebarProps> = React.memo(({currentWordId, onOpenSidebar, sidebarOpen, words}) => {
  const listRef = useRef<any>(null);
  const {groupCounts, wordGroups} = useMemo(() => {
    const groupedWords = groupBy(words, (word) => word.tenses[0][0]);
    const groupCounts = Object.values(groupedWords).map((words) => words.length);
    const wordGroups = Object.keys(groupedWords);

    return {groupCounts, wordGroups};
  }, [words]);

  return (
    <Drawer variant="temporary" anchor="left" open={sidebarOpen} onClose={() => onOpenSidebar()}>
      <GroupedVirtuoso
        className={styles.sidebarContent}
        ref={listRef}
        initialTopMostItemIndex={{
          index: currentWordId - 1,
          align: 'center',
        }}
        groupCounts={groupCounts}
        components={MUIComponents}
        groupContent={(index) => wordGroups[index]}
        itemContent={(index) => (
          <SidebarListItem
            word={words[index]}
            index={index}
            currentWordId={currentWordId}
            onOpenSidebar={onOpenSidebar}
          />
        )}
      />
    </Drawer>
  );
});

const MUIComponents: any = {
  List: React.forwardRef(({style, children}: any, listRef: any) => (
    <List style={{padding: 0, ...style}} component="div" ref={listRef}>
      {children}
    </List>
  )),
  Item: ({children, ...props}: any) => (
    <ListItemCustom component="div" {...props}>
      {children}
    </ListItemCustom>
  ),
  Group: ({children, ...props}: any) => (
    <ListSubheaderCustom component="div" {...props}>
      {children}
    </ListSubheaderCustom>
  ),
};

export default Sidebar;
