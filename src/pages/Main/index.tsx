import React, {useEffect, useRef} from 'react';

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
  const typeFormInputRef = useRef<HTMLInputElement | null>(null);

  /**
   * Fetch dictionary, Init Word
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
      <WordAndSentence typeFormInputRef={typeFormInputRef} />
      <TypeForm typeFormInputRef={typeFormInputRef} />
      <Keyboard />
    </Layout>
  );
};

export default Main;
