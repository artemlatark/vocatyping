import {useEffect} from 'react';

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
  const {currentWord, currentWordId, tenseIndex} = useAppSelector((state) => state.currentWordReducer);

  /**
   * Fetch Dictionary and Set Initial Current Word
   */
  useEffect(() => {
    if (loading === LoadingStatus.succeeded) {
      const currentWordSettable = words[currentWordId ? currentWordId - 1 : 0];

      dispatch(currentWordSlice.actions.setCurrentWord(currentWordSettable));
      dispatch(currentWordSlice.actions.initTenseVariants(currentWordSettable.tenses[tenseIndex]));
    }
  }, [words, loading, currentWord, currentWordId, tenseIndex, dispatch]);

  useEffect(() => {
    dispatch(fetchWordsInDictionary());
  }, [dispatch]);

  return (
    <Layout>
      <WordAndSentence />
      <TypeForm />
      <Keyboard />
    </Layout>
  );
};

export default Main;
