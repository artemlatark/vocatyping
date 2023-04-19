import {useCallback, useEffect, useMemo, useState} from 'react';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {fetchWordsInDictionary} from 'store/words/actionCreators';

import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';

const Main = () => {
  const dispatch = useAppDispatch();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {words, isLoading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, writtenText, tenseIndex, tenseVariants, tenseVariantIndex} = useAppSelector((state) => state.currentWordReducer);
  const currentWord = words.find((word) => word.id === currentWordId) || words[0];
  const wordNumbers = words.length;
  const currentWordIndex = useMemo(() => (currentWordId ? words.findIndex((word) => word.id === currentWordId) : 0), [words, currentWordId]);
  const nextWordId = words[currentWordIndex + 1]?.id;

  const onOpenSidebar = useCallback((value?: boolean) => {
    setSidebarOpen((prevState) => {
      return value !== undefined ? value : !prevState;
    });
  }, []);

  useEffect(() => {
    dispatch(fetchWordsInDictionary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout onOpenSidebar={onOpenSidebar} sidebarOpen={sidebarOpen} words={words} wordNumbers={wordNumbers} currentWord={currentWord} currentWordId={currentWordId}>
      <WordAndSentence tenseIndex={tenseIndex} tenseVariants={tenseVariants} tenseVariantIndex={tenseVariantIndex} currentWord={currentWord} />
      <TypeForm
        wordNumbers={wordNumbers}
        isLoading={isLoading}
        currentWordId={currentWordId}
        writtenText={writtenText}
        tenseIndex={tenseIndex}
        tenseVariants={tenseVariants}
        currentWord={currentWord}
        tenseVariantIndex={tenseVariantIndex}
        nextWordId={nextWordId}
      />
      <Keyboard currentWordId={currentWordId} writtenText={writtenText} tenseVariants={tenseVariants} tenseVariantIndex={tenseVariantIndex} />
    </Layout>
  );
};

export default Main;
