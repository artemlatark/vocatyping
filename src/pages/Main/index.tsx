import {useEffect, useMemo} from 'react';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {currentWordSlice} from 'store/currentWord/slice';
import {fetchWordsInDictionary} from 'store/words/actionCreators';

import {LoadingStatus} from 'models/LoadingStatus';

import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';

const Main = () => {
  const dispatch = useAppDispatch();
  const {words, loading} = useAppSelector((state) => state.wordsReducer);
  const {currentWord, currentWordId, currentWordIndex, writtenText, tenseIndex, tenseVariants, tenseVariantIndex} = useAppSelector((state) => state.currentWordReducer);

  const wordNumbers = words.length;
  const nextWordId = words[currentWordIndex]?.id;

  /**
   * Set Initial Current Word
   */
  useEffect(() => {
    if (loading === LoadingStatus.succeeded) {
      const currentWord = words[currentWordId ? currentWordId - 1 : 0];

      dispatch(currentWordSlice.actions.setCurrentWord(currentWord));
    }
  }, [words, loading, currentWordId, dispatch]);

  useEffect(() => {
    dispatch(fetchWordsInDictionary());
  }, [dispatch]);

  return (
    <Layout>
      <WordAndSentence tenseIndex={tenseIndex} tenseVariants={tenseVariants} tenseVariantIndex={tenseVariantIndex} currentWord={currentWord} />
      <TypeForm
        wordNumbers={wordNumbers}
        loading={loading}
        currentWordId={currentWordId}
        currentWordIndex={currentWordIndex}
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
