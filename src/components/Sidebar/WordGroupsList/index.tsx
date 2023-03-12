import React, {useEffect, useMemo} from 'react';
import {Props} from './types';

import styles from './index.module.css';
import {TabCustom, TabsCustom} from './styles';

const WordGroupsList: React.FC<Props> = ({listRef, wordGroupsCounts, wordGroups, currentWord}) => {
  const currentWordGroup: number = useMemo(
    () => wordGroups.findIndex((letter) => letter === currentWord?.tenses[0][0]),
    [currentWord, wordGroups]
  );
  const [tabIndex, setTabIndex] = React.useState(0);

  const handlerChangeTab = (newTabIndex: number, itemIndex: number) => {
    if (listRef.current) {
      setTabIndex(newTabIndex);

      listRef.current.scrollToIndex({
        index: itemIndex,
        align: 'center',
      });
    }
  };

  useEffect(() => {
    setTabIndex(currentWordGroup !== -1 ? currentWordGroup : 0);
  }, [currentWordGroup]);

  return (
    <TabsCustom
      orientation="vertical"
      variant="scrollable"
      value={tabIndex}
      sx={{borderRight: 1, borderColor: 'divider'}}
    >
      {wordGroupsCounts
        .reduce(
          ({firstItemsIndexes, offset}: any, count: any) => ({
            firstItemsIndexes: [...firstItemsIndexes, offset],
            offset: offset + count,
          }),
          {firstItemsIndexes: [], offset: 0}
        )
        .firstItemsIndexes.map((itemIndex: any, index: number) => (
          <TabCustom
            key={`vertical-tab-${index}`}
            id={`vertical-tab-${index}`}
            aria-controls={`vertical-tabpanel-${index}`}
            label={
              <div className={styles.wordGroupsListItem} onClick={() => handlerChangeTab(index, itemIndex)}>
                {wordGroups[index]}
              </div>
            }
          />
        ))}
    </TabsCustom>
  );
};

export default WordGroupsList;
