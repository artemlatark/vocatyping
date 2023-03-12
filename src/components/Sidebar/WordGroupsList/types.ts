import React from 'react';
import {GroupedVirtuosoHandle} from 'react-virtuoso';
import {Word} from 'models/Word';
import {WordGroups} from '../types';

export interface Props extends WordGroups {
  listRef: React.RefObject<GroupedVirtuosoHandle>;
  currentWord: Word | undefined;
}
