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
  const {entities: words, loading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId} = useAppSelector((state) => state.currentWordReducer);

  /**
   * Fetch dictionary, Set initial current word, Init tense variants
   */
  useEffect(() => {
    if (loading === LoadingStatus.idle) {
      dispatch(fetchWordsInDictionary());
    }

    if (loading === LoadingStatus.succeeded) {
      const word = words[currentWordId - 1];

      dispatch(currentWordSlice.actions.initWord(word));
    }
  }, [words, loading, currentWordId, dispatch]);

  return (
    <Layout>
      <WordAndSentence />
      <TypeForm />
      <Keyboard />
    </Layout>
  );
};

export default Main;
