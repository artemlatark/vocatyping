import React from 'react';

import {GroupedVirtuosoHandle} from 'react-virtuoso';

import {State as CurrentWordState} from 'store/currentWord/types';

import {Word} from 'models/Word';

import {HandleOpenSidebar} from 'components/Layout/types';

export interface SidebarProps {
  isOpen: boolean;
  handleOpen: HandleOpenSidebar;
}

export interface WordGroups {
  wordGroupsCounts: number[];
  wordGroups: string[];
}

export interface ListItemProps {
  word: Word;
  index: number;
  currentWordId: CurrentWordState['currentWordId'];
  handleOpenSidebar: HandleOpenSidebar;
}

export interface WordGroupsListProps extends WordGroups {
  listRef: React.RefObject<GroupedVirtuosoHandle>;
  currentTabIndex: number;
}
