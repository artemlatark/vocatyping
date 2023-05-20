import React from 'react';

import styles from './index.module.css';
import {TabCustom, TabsCustom} from './styles';
import {WordGroupsListProps} from '../../types';

const WordGroupsList: React.FC<WordGroupsListProps> = ({listRef, wordGroupsCounts, wordGroups, currentTabIndex}) => {
  const [tabIndex, setTabIndex] = React.useState<number>(currentTabIndex);

  const handlerChangeTab = (itemIndex: number, newTabIndex: number): void => {
    if (listRef.current) {
      setTabIndex(newTabIndex);

      listRef.current.scrollToIndex({
        index: itemIndex,
        align: 'center',
      });
    }
  };

  return (
    <TabsCustom orientation="vertical" variant="scrollable" value={tabIndex} sx={{borderRight: 1, borderColor: 'divider'}}>
      {wordGroupsCounts
        .reduce(
          ({firstItemsIndexes, offset}: any, count: number) => ({
            firstItemsIndexes: [...firstItemsIndexes, offset],
            offset: offset + count,
          }),
          {firstItemsIndexes: [], offset: 0}
        )
        .firstItemsIndexes.map((itemIndex: number, index: number) => (
          <TabCustom
            onClick={() => handlerChangeTab(itemIndex, index)}
            key={`vertical-tab-${index}`}
            id={`vertical-tab-${index}`}
            className={styles.wordGroupsListItem}
            label={wordGroups[index]}
          />
        ))}
    </TabsCustom>
  );
};

export default WordGroupsList;
