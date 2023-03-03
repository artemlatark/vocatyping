import React, {memo, useMemo, useRef} from 'react';
import Drawer from '@mui/material/Drawer';

import {Props as SidebarProps} from './types';
import SidebarListItem from './SidebarListItem';

import styles from './index.module.css';
import {GroupedVirtuoso, Virtuoso} from 'react-virtuoso';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import {WordGroup} from '../../models/wordGroup';

import {groupBy} from 'lodash';

const MUIComponents: any = {
  List: React.forwardRef(({style, children}: any, listRef: any) => {
    return (
      <List style={{padding: 0, ...style, margin: 0}} component="div" ref={listRef}>
        {children}`
      </List>
    );
  }),

  Item: ({children, ...props}: any) => {
    return (
      <ListItem component="div" {...props} style={{margin: 0}}>
        {children}
      </ListItem>
    );
  },

  Group: ({children, style, ...props}: any) => {
    return (
      <ListSubheader
        component="div"
        {...props}
        style={{
          ...style,
          backgroundColor: 'white',
          margin: 0,
        }}
      >
        {children}
      </ListSubheader>
    );
  },
};

const Sidebar: React.FC<SidebarProps> = ({currentWordId, onOpenSidebar, sidebarOpen, sidebarWidth, words}) => {
  const listRef = useRef<any>(null);
  const {groupCounts, groups} = useMemo(() => {
    const groupedWords = groupBy(words, (word) => word.tenses[0][0]);
    const groupCounts = Object.values(groupedWords).map((words) => words.length);
    const groups = Object.keys(groupedWords);

    return {groupCounts, groups};
  }, [words]);

  const scrollToItem = () => {
    if (listRef.current && sidebarOpen) {
      listRef.current.scrollToItem(currentWordId - 1, 'smart');
    }
  };

  return (
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
      <GroupedVirtuoso
        style={{height: '100%', width: 300}}
        groupCounts={groupCounts}
        components={MUIComponents}
        groupContent={(index) => {
          return <div>{groups[index]}</div>;
        }}
        itemContent={(index) => {
          const word = words[index];
          return (
            <SidebarListItem word={word} index={index} currentWordId={currentWordId} onOpenSidebar={onOpenSidebar} />
          );
        }}
      />
    </Drawer>
  );
};

export default memo(Sidebar);
