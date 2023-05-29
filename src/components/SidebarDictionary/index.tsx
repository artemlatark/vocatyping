import React, {useEffect, useMemo, useRef, useState} from 'react';

import {groupBy} from 'lodash';
import {Virtuoso, GroupedVirtuoso, GroupedVirtuosoHandle} from 'react-virtuoso';

import CircularProgress from '@mui/material/CircularProgress';
import Drawer from '@mui/material/Drawer';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

import {useAppSelector} from 'hooks/redux';

import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

import ListItem from './components/ListItem';
import MUIComponents from './components/MuiComponents';
import WordGroupsList from './components/WordGroupsList';
import styles from './index.module.css';
import {TypographyCustom} from './styles';
import {SidebarDictionaryProps, WordGroups} from './types';

const SidebarDictionary: React.FC<SidebarDictionaryProps> = React.memo(({sidebarOpen, handleOpenSidebar}) => {
  const {entities: words, loading} = useAppSelector((state) => state.wordsReducer);
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

  const currentTabIndex = useMemo(() => (currentWord ? wordGroups.indexOf(currentWord?.tenses[0][0]) : 0), [currentWord, wordGroups]);

  const handleChangeSearchWord = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const searchWord = event.target.value;

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

  useEffect(() => {
    if (sidebarOpen) {
      setSearchWord('');
      setFilteredWords([]);
    }
  }, [sidebarOpen]);

  return (
    <Drawer open={sidebarOpen} onClose={() => handleOpenSidebar()}>
      <div className={styles.wrapper}>
        {loading === LoadingStatus.succeeded ? (
          <>
            <TextField name="search" placeholder="Start typing any word for search" onChange={handleChangeSearchWord} autoComplete="off" fullWidth />
            {searchWord ? (
              <Grid className={styles.groupedContainer}>
                {filteredWords.length ? (
                  <Virtuoso
                    className={styles.wordList}
                    data={filteredWords}
                    itemContent={(index, word) => <ListItem word={word} index={index} currentWordId={currentWordId} handleOpenSidebar={handleOpenSidebar} />}
                  />
                ) : (
                  <TypographyCustom>Nothing was found</TypographyCustom>
                )}
              </Grid>
            ) : (
              <Grid className={styles.groupedContainer} container>
                <WordGroupsList listRef={listRef} wordGroupsCounts={wordGroupsCounts} wordGroups={wordGroups} currentTabIndex={currentTabIndex} />
                <GroupedVirtuoso
                  className={styles.wordList}
                  ref={listRef}
                  initialTopMostItemIndex={{
                    index: currentWordIndex,
                    align: 'center',
                  }}
                  components={MUIComponents}
                  groupCounts={wordGroupsCounts}
                  groupContent={(index) => wordGroups[index]}
                  itemContent={(index) => <ListItem word={words[index]} index={index} currentWordId={currentWordId} handleOpenSidebar={handleOpenSidebar} />}
                />
              </Grid>
            )}
          </>
        ) : (
          <Grid alignItems="center" justifyContent="center" container sx={{height: '100%'}}>
            <CircularProgress />
          </Grid>
        )}
      </div>
    </Drawer>
  );
});

export default SidebarDictionary;
