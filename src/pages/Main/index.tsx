import {FC, useCallback, useEffect} from 'react';

import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useKeyPress} from 'hooks/useKeyPress';

import {changeWord, initWord} from 'store/currentWord/slice';
import {fetchDictionary} from 'store/words/actionCreators';

import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

import Keyboard from 'components/Keyboard';
import Pagination from 'components/Pagination';
import TypeForm from 'components/TypeForm';
import WordAndSentence from 'components/WordAndSentence';

import {Props} from './types';

const Main: FC<Props> = ({isOpenSidebar}) => {
  const dispatch = useAppDispatch();
  const {entities: words, loading} = useAppSelector((state) => state.words);
  const {currentWordId, currentWordIndex} = useAppSelector((state) => state.currentWord);
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');

  const wordNumbers = words.length;

  // TODO: see https://github.com/artemkrynkin/vocatyping/issues/74
  const handleSwitchToPrevOrNextWord = useCallback(
    (currentWordIndex: number, words: Word[], isPrev: boolean): void => {
      const word = isPrev ? words[currentWordIndex - 1] : words[currentWordIndex + 1];

      dispatch(changeWord(word.id));
      dispatch(initWord(word));
    },
    [dispatch]
  );

  const handleChangeWord = useCallback(
    (handlerType: 'prev' | 'next'): void => {
      if (isOpenSidebar) return;
      handleSwitchToPrevOrNextWord(currentWordIndex, words, handlerType === 'prev');
    },
    [currentWordIndex, handleSwitchToPrevOrNextWord, words, isOpenSidebar]
  );

  useEffect(() => {
    if (pressedAlt && (pressedArrowLeft || pressedArrowRight)) {
      handleChangeWord(pressedArrowLeft ? 'prev' : 'next');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedAlt, pressedArrowLeft, pressedArrowRight]);

  /**
   * Fetch dictionary, Init Word
   */
  useEffect(() => {
    if (loading === LoadingStatus.idle) {
      dispatch(fetchDictionary({initialWordId: currentWordIndex}));
    }
  }, [words, loading, currentWordIndex, dispatch]);

  return (
    <>
      <Pagination
        handlePrev={() => handleChangeWord('prev')}
        handleNext={() => handleChangeWord('next')}
        currentNumber={currentWordId}
        allNumbers={wordNumbers}
        loading={loading !== LoadingStatus.succeeded}
      />
      <WordAndSentence />
      <TypeForm />
      <Keyboard />
    </>
  );
};

export default Main;
