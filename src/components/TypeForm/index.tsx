import React, {FC, useEffect} from 'react';

import {useAppDispatch} from '../../hooks/redux';
import {checkTextSlice} from '../../store/reducers/CheckTextSlice';
import {IWord, WordState} from '../../models/IWord';
import {CheckText} from '../../models/CheckText';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';

interface TypeFormProps {
  currentWord: IWord | undefined;
  wordNumbers: number;
}

type WordStatePick = Pick<WordState, 'isLoading'>;

const TypeForm: FC<TypeFormProps & WordStatePick & CheckText> = ({
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

    dispatch(checkTextSlice.actions.onWriteText(inputValue));
  };

  const onKeyDownInput: React.KeyboardEventHandler<HTMLInputElement> = (event): void => {
    if (/^[а-яА-ЯёЁ)]+$/.test(event.key) || /Enter|Backspace|Space/.test(event.code)) {
      event.preventDefault();
    }
  };

  const onKeyUpInput = (): void => {
    dispatch(checkTextSlice.actions.onCheckInputLetter(writtenText));

    if (
      writtenText.length === wordVariants[currentVariantIndex].variant.length &&
      wordVariants[currentVariantIndex].variant === writtenText
    ) {
      dispatch(checkTextSlice.actions.onCheckEnteredWord());

      if (currentWord && currentVariantIndex === wordVariants.length - 1) {
        if (currentWordTense !== currentWord.tenses.length - 1) {
          dispatch(checkTextSlice.actions.onNextTense());
        } else {
          dispatch(checkTextSlice.actions.onChangeWord({handlerType: 'next', wordNumbers}));
        }
      }
    }
  };

  useEffect(() => {
    if (currentWord) {
      dispatch(checkTextSlice.actions.initWord(currentWord.tenses[currentWordTense]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentWordId, currentWordTense]);

  return (
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
  );
};

export default TypeForm;
