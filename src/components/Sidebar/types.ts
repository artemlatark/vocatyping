import React from 'react';

import {GroupedVirtuosoHandle} from 'react-virtuoso';

import {State as CurrentWordState} from 'store/currentWord/types';

import {CurrentWord, Word} from 'models/Word';

export interface SidebarProps {
  sidebarOpen: boolean;
  handleOpenSidebar: (value?: boolean) => void;
}

export interface WordGroups {
  wordGroupsCounts: number[];
  wordGroups: string[];
}

export interface ListItemProps {
  word: Word;
  index: number;
  currentWordId: CurrentWordState['currentWordId'];
  handleOpenSidebar: (value?: boolean) => void;
}

export interface WordGroupsListProps extends WordGroups, CurrentWord {
  listRef: React.RefObject<GroupedVirtuosoHandle>;
}
