import React, {useEffect} from 'react';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {fetchWordsInDictionary} from 'store/words/actionCreators';

import {LoadingStatus} from 'models/LoadingStatus';

import Keyboard from 'components/Keyboard';
import Layout from 'components/Layout';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';

const Main = () => {
  const dispatch = useAppDispatch();
  const {entities: words, loading} = useAppSelector((state) => state.wordsReducer);
  const {currentWordIndex} = useAppSelector((state) => state.currentWordReducer);

  /**
   * Fetch dictionary, Init Word
   */
  useEffect(() => {
    if (loading === LoadingStatus.idle) {
      dispatch(fetchWordsInDictionary({initialWordId: currentWordIndex}));
    }
  }, [words, loading, currentWordIndex, dispatch]);

  return (
    <Layout>
      <WordAndSentence />
      <TypeForm />
      <Keyboard />
    </Layout>
  );
};

export default Main;
