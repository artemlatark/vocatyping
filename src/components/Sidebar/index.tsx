import React, {useMemo, useRef, useState} from 'react';

import {groupBy} from 'lodash';
import {Virtuoso, GroupedVirtuoso, GroupedVirtuosoHandle} from 'react-virtuoso';

import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {useAppSelector} from 'hooks/redux';

import {Word} from 'models/Word';

import ListItem from './components/ListItem';
import MUIComponents from './components/MuiComponents';
import WordGroupsList from './components/WordGroupsList';
import styles from './index.module.css';
import {SidebarProps, WordGroups} from './types';

const Sidebar: React.FC<SidebarProps> = React.memo(({sidebarOpen, handleOpenSidebar}) => {
  const {entities: words} = useAppSelector((state) => state.wordsReducer);
  const {currentWord, currentWordId, currentWordIndex} = useAppSelector((state) => state.currentWordReducer);
  const listRef = useRef<GroupedVirtuosoHandle>(null);
  const [searchWord, setSearchWord] = useState<string>('');
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  const {wordGroupsCounts, wordGroups}: WordGroups = useMemo(() => {
    const wordsByGroup = groupBy(words, (word) => word.tenses[0][0].toLowerCase());
    const wordGroupsCountsSrc = Object.values(wordsByGroup).map((groupedWords) => groupedWords.length);
    const wordGroupsSrc = Object.keys(wordsByGroup);

    return {wordGroupsCounts: wordGroupsCountsSrc, wordGroups: wordGroupsSrc};
  }, [words]);

  const handleChangeSearchWord = (e: any) => {
    const searchWord = e.target.value;

    const letterIndex = wordGroups.indexOf(searchWord[0]);
    let startIndex = 0;
    let endIndex = wordGroupsCounts[letterIndex];

    for (let i = 0; i < letterIndex; i++) {
      startIndex += wordGroupsCounts[i];
      endIndex += wordGroupsCounts[i];
    }

    const wordsSliced = words.slice(startIndex, endIndex);
    let newFilteredWords: Word[];

    if (searchWord.length > 1) {
      newFilteredWords = wordsSliced.filter((word) => {
        return word.tenses.some((tense) => {
          return tense.toLowerCase().slice(0, searchWord.length) === searchWord;
        });
      });
    } else if (searchWord.length === 1) {
      newFilteredWords = wordsSliced;
    } else {
      newFilteredWords = [];
    }

    setSearchWord(searchWord);
    setFilteredWords(newFilteredWords);
  };

  return (
    <Drawer variant="temporary" anchor="left" open={sidebarOpen} onClose={() => handleOpenSidebar()}>
      <TextField placeholder="Start typing any word for search" onChange={handleChangeSearchWord} />
      <div className={styles.wrapper}>
        {searchWord ? (
          <>
            {filteredWords.length ? (
              <Virtuoso
                className={styles.wordList}
                data={filteredWords}
                itemContent={(index, word) => <ListItem word={word} index={index} currentWordId={currentWordId} handleOpenSidebar={handleOpenSidebar} />}
              />
            ) : (
              <Typography>Nothing was found</Typography>
            )}
          </>
        ) : (
          <Grid className={styles.groupedContainer} container>
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
        )}
      </div>
    </Drawer>
  );
});

export default Sidebar;
