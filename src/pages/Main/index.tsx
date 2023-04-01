import {useCallback, useState} from 'react';

import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';
import {useAppSelector} from 'hooks/redux';

const Main = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {words, isLoading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector((state) => state.currentWordReducer);
  const currentWord = words[currentWordId - 1];
  const wordNumbers = words.length;

  const onOpenSidebar = useCallback((value?: boolean) => {
    setSidebarOpen((prevState) => {
      return value !== undefined ? value : !prevState;
    });
  }, []);

  return (
    <Layout onOpenSidebar={onOpenSidebar} sidebarOpen={sidebarOpen} words={words} wordNumbers={wordNumbers} currentWord={currentWord} currentWordId={currentWordId}>
      <WordAndSentence currentWordTense={currentWordTense} wordVariants={wordVariants} currentVariantIndex={currentVariantIndex} currentWord={currentWord} />
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
      <Keyboard currentWordId={currentWordId} writtenText={writtenText} wordVariants={wordVariants} currentVariantIndex={currentVariantIndex} />
    </Layout>
  );
};

export default Main;
