import React from 'react';

import {GroupedVirtuosoHandle} from 'react-virtuoso';

import {State as CurrentWordState} from 'store/currentWord/types';

import {Word} from 'models/Word';

export interface SidebarDictionaryProps {
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

export interface WordGroupsListProps extends WordGroups {
  listRef: React.RefObject<GroupedVirtuosoHandle>;
  currentTabIndex: number;
}
