import {useEffect, useMemo} from 'react';

import TypeForm from './components/TypeForm';
import {useAppDispatch, useAppSelector} from './hooks/redux';
import {fetchWords} from './store/reducers/ActionCreators';
import WordAndSentence from './components/WordAndSentence';
import Keyboard from './components/Keyboard';
import Navigation from './components/Navigation';

import './App.css';

function App() {
  const dispatch = useAppDispatch();
  const {words, isLoading} = useAppSelector((state) => state.wordReducer);
  const {currentWordId, writtenText, currentWordTense, wordVariants, currentVariantIndex} = useAppSelector(
    (state) => state.writtenTextCheckReducer
  );
  const currentWord = useMemo(() => words.find((item) => item.id === currentWordId), [words, currentWordId]);

  useEffect(() => {
    dispatch(fetchWords());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="app">
      <Navigation words={words} currentWordId={currentWordId} />
      <WordAndSentence
        currentWordTense={currentWordTense}
        wordVariants={wordVariants}
        currentVariantIndex={currentVariantIndex}
        currentWord={currentWord}
      />
      <TypeForm
        currentWord={currentWord}
        words={words}
        isLoading={isLoading}
        currentWordTense={currentWordTense}
        currentWordId={currentWordId}
        wordVariants={wordVariants}
        currentVariantIndex={currentVariantIndex}
        writtenText={writtenText}
      />
      <Keyboard currentVariantIndex={currentVariantIndex} wordVariants={wordVariants} writtenText={writtenText} />
    </div>
  );
}

export default App;
