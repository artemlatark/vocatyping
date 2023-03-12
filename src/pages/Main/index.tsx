import {useCallback, useState} from 'react';

import {useAppSelector} from 'hooks/redux';
import Sidebar from 'components/Sidebar';
import Header from 'components/Header';
import WordAndSentence from 'components/WordAndSentence';
import TypeForm from 'components/TypeForm';
import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {words, isLoading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector(
    (state) => state.currentWordReducer
  );
  const currentWord = words[currentWordId - 1];
  const wordNumbers = words.length;

  const onOpenSidebar = useCallback(
    (value?: boolean) => setSidebarOpen((prevState) => (value !== undefined ? value : !prevState)),
    []
  );

  return (
    <Layout
      sidebar={
        <Sidebar
          onOpenSidebar={onOpenSidebar}
          sidebarOpen={sidebarOpen}
          currentWord={currentWord}
          currentWordId={currentWordId}
          words={words}
        />
      }
    >
      <Header
        onOpenSidebar={onOpenSidebar}
        wordNumbers={wordNumbers}
        currentWordId={currentWordId}
        currentWord={currentWord}
        currentWordTense={currentWordTense}
      />
      <WordAndSentence
        currentWordTense={currentWordTense}
        wordVariants={wordVariants}
        currentVariantIndex={currentVariantIndex}
        currentWord={currentWord}
      />
      <TypeForm
        wordNumbers={wordNumbers}
        isLoading={isLoading}
        currentWordId={currentWordId}
        writtenText={writtenText}
        currentWordTense={currentWordTense}
        wordVariants={wordVariants}
        currentWord={currentWord}
        currentVariantIndex={currentVariantIndex}
      />
      <Keyboard
        currentWordId={currentWordId}
        writtenText={writtenText}
        wordVariants={wordVariants}
        currentVariantIndex={currentVariantIndex}
      />
    </Layout>
  );
};

export default Main;
