import React from 'react';

import {GroupedVirtuosoHandle} from 'react-virtuoso';

import {State as CurrentWordState} from 'store/currentWord/types';
import {State as WordsState} from 'store/words/types';

import {CurrentWord, Word} from 'models/Word';

export interface SidebarProps extends CurrentWord, Pick<WordsState, 'words'>, Pick<CurrentWordState, 'currentWordId'> {
  onOpenSidebar: (value?: boolean) => void;
  sidebarOpen: boolean;
}

export interface WordGroups {
  wordGroupsCounts: number[];
  wordGroups: string[];
}

export interface ListItemProps {
  word: Word;
  index: number;
  currentWordId: number;
  onOpenSidebar: (value?: boolean) => void;
}

export interface WordGroupsListProps extends CurrentWord, WordGroups {
  listRef: React.RefObject<GroupedVirtuosoHandle>;
}
