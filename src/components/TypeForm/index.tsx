import React, {useEffect} from 'react';

import {useAppDispatch} from 'hooks/redux';
import {currentWordSlice} from 'store/currentWord/slice';
import {Props} from './types';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';

const TypeForm: React.FC<Props> = ({
  currentWord,
  wordNumbers,
  isLoading,
  currentWordId,
  writtenText,
  currentWordTense,
  wordVariants,
  currentVariantIndex,
}) => {
  const dispatch = useAppDispatch();

  const onChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
    const inputValue = event.currentTarget.value;

    dispatch(currentWordSlice.actions.onWriteText(inputValue));
  };

  const onKeyDownInput: React.KeyboardEventHandler<HTMLInputElement> = (event): void => {
    if (/^[а-яА-ЯёЁ)]+$/.test(event.key) || /Enter|Backspace|Space/.test(event.code)) {
      event.preventDefault();
    }
  };

  const onKeyUpInput = (): void => {
    dispatch(currentWordSlice.actions.onCheckInputLetter(writtenText));

    if (
      writtenText.length === wordVariants[currentVariantIndex].variant.length &&
      writtenText === wordVariants[currentVariantIndex].variant.toLowerCase()
    ) {
      dispatch(currentWordSlice.actions.onCheckEnteredWord());

      if (currentWord && currentVariantIndex === wordVariants.length - 1) {
        if (currentWordTense !== currentWord.tenses.length - 1) {
          dispatch(currentWordSlice.actions.onNextTense());
        } else {
          dispatch(currentWordSlice.actions.onChangeWord({handlerType: 'next', wordNumbers}));
        }
      }
    }
  };

  useEffect(() => {
    if (currentWord) {
      dispatch(currentWordSlice.actions.initWord(currentWord.tenses[currentWordTense]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentWordId, currentWordTense]);

  return (
    <>
      <form className={styles.typeForm}>
        <TypeFormTextField
          onChange={onChangeInput}
          onKeyDown={onKeyDownInput}
          onKeyUp={onKeyUpInput}
          value={writtenText}
          autoFocus
          fullWidth
        />
        <TypeFormFormHelperText className={styles.helperText}>Type the word by letters</TypeFormFormHelperText>
      </form>
    </>
  );
};

export default TypeForm;
