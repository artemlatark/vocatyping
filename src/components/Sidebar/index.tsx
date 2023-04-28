import React, {useMemo, useRef} from 'react';

import {groupBy} from 'lodash';
import {GroupedVirtuoso, GroupedVirtuosoHandle} from 'react-virtuoso';

import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';

import {useAppSelector} from 'hooks/redux';

import ListItem from './components/ListItem';
import MUIComponents from './components/MuiComponents';
import WordGroupsList from './components/WordGroupsList';
import styles from './index.module.css';
import {SidebarProps, WordGroups} from './types';

const Sidebar: React.FC<SidebarProps> = React.memo(({sidebarOpen, handleOpenSidebar}) => {
  const {entities: words} = useAppSelector((state) => state.wordsReducer);
  const {currentWord, currentWordId, currentWordIndex} = useAppSelector((state) => state.currentWordReducer);

  const listRef = useRef<GroupedVirtuosoHandle>(null);

  const {wordGroupsCounts, wordGroups}: WordGroups = useMemo(() => {
    const wordsByGroup = groupBy(words, (word) => word.tenses[0][0].toLowerCase());
    const wordGroupsCountsSrc = Object.values(wordsByGroup).map((groupedWords) => groupedWords.length);
    const wordGroupsSrc = Object.keys(wordsByGroup);

    return {wordGroupsCounts: wordGroupsCountsSrc, wordGroups: wordGroupsSrc};
  }, [words]);

  return (
    <Drawer variant="temporary" anchor="left" open={sidebarOpen} onClose={() => handleOpenSidebar()}>
      <Grid className={styles.sidebarContainer} container>
        <WordGroupsList listRef={listRef} wordGroupsCounts={wordGroupsCounts} wordGroups={wordGroups} currentWord={currentWord} />
        <GroupedVirtuoso
          className={styles.wordList}
          ref={listRef}
          initialTopMostItemIndex={{
            index: currentWordIndex,
            align: 'center',
          }}
          groupCounts={wordGroupsCounts}
          components={MUIComponents}
          groupContent={(index) => wordGroups[index]}
          itemContent={(index) => <ListItem word={words[index]} index={index} currentWordId={currentWordId} handleOpenSidebar={handleOpenSidebar} />}
        />
      </Grid>
    </Drawer>
  );
});

export default Sidebar;
