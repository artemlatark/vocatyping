import React, {useEffect, useMemo, useState} from 'react';

import TypeForm from './components/TypeForm';
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {fetchWords} from './store/reducers/ActionCreators';
import Layout from './components/Layout';
import WordAndSentence from './components/WordAndSentence';
import Keyboard from './components/Keyboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

const sidebarWidth = 360;

function App() {
  const dispatch = useAppDispatch();
  const {words, isLoading} = useAppSelector((state) => state.wordReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector(
    (state) => state.writtenTextCheckReducer
  );
  const currentWord = useMemo(() => words.find((item) => item.id === currentWordId), [words, currentWordId]);
  const wordNumbers = words.length;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const onOpenSidebar = () => setSidebarOpen((prevState) => !prevState);

  useEffect(() => {
    dispatch(fetchWords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      sidebar={
        <Sidebar words={words} onOpenSidebar={onOpenSidebar} sidebarWidth={sidebarWidth} sidebarOpen={sidebarOpen} />
      }
    >
      <Header onOpenSidebar={onOpenSidebar} wordNumbers={wordNumbers} currentWordId={currentWordId} />
      <WordAndSentence
        currentWordTense={currentWordTense}
        wordVariants={wordVariants}
        currentVariantIndex={currentVariantIndex}
        currentWord={currentWord}
      />
      <TypeForm
        wordNumbers={wordNumbers}
        isLoading={isLoading}
        currentWord={currentWord}
        currentWordTense={currentWordTense}
        currentWordId={currentWordId}
        wordVariants={wordVariants}
        currentVariantIndex={currentVariantIndex}
        writtenText={writtenText}
      />
      <Keyboard
        currentVariantIndex={currentVariantIndex}
        wordVariants={wordVariants}
        writtenText={writtenText}
        sidebarOpen={sidebarOpen}
      />
    </Layout>
  );
}

export default App;
