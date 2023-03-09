const WordGroupsList = ({wordGroups, groupCounts, listRef}: any) => {
  const handlerClick = (itemIndex: number) => {
    listRef.current.scrollToIndex({
      index: itemIndex,
    });
  };

  return (
    <ul
      style={{
        marginLeft: '0.5rem',
        paddingLeft: '0',
        listStyle: 'none',
        fontSize: '0.8rem',
      }}
    >
      {groupCounts
        .reduce(
          ({firstItemsIndexes, offset}: any, count: any) => {
            console.log(firstItemsIndexes, offset, count);

            return {
              firstItemsIndexes: [...firstItemsIndexes, offset],
              offset: offset + count,
            };
          },
          {firstItemsIndexes: [], offset: 0}
        )
        .firstItemsIndexes.map((itemIndex: any, index: number) => {
          return (
            <li key={index}>
              <button onClick={() => handlerClick(itemIndex)}>{wordGroups[index]}</button>
            </li>
          );
        })}
    </ul>
  );
};

export default WordGroupsList;
