import {useCallback, useEffect, useMemo, useState} from 'react';

import TypeForm from './components/TypeForm';
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {fetchWords} from './store/words/actions';
import Layout from './components/Layout';
import WordAndSentence from './components/WordAndSentence';
import Keyboard from './components/Keyboard';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

function App() {
  const dispatch = useAppDispatch();
  const {words, isLoading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector(
    (state) => state.currentWordReducer
  );
  const currentWord = useMemo(() => words.find((item) => item.id === currentWordId), [words, currentWordId]);
  const wordNumbers = words.length;
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const onOpenSidebar = useCallback(
    (value?: boolean) => setSidebarOpen((prevState) => (value !== undefined ? value : !prevState)),
    []
  );

  useEffect(() => {
    dispatch(fetchWords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Layout
      sidebar={
        <Sidebar currentWordId={currentWordId} onOpenSidebar={onOpenSidebar} sidebarOpen={sidebarOpen} words={words} />
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
}

export default App;
