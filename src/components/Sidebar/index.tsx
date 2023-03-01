import React, {memo, useRef} from 'react';
import {FixedSizeList as List} from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Drawer from '@mui/material/Drawer';

import {Props as SidebarProps} from './types';
import ItemList from './ItemList';

import styles from './index.module.css';

const itemKey = (index: number, data: any) => data[index].id;

const Sidebar: React.FC<SidebarProps> = ({currentWordId, onOpenSidebar, sidebarOpen, sidebarWidth, words}) => {
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
            {(props) => <ItemList currentWordId={currentWordId} onOpenSidebar={onOpenSidebar} {...props} />}
          </List>
        </Drawer>
      )}
    </AutoSizer>
  );
};

export default memo(Sidebar);
