import React, {useEffect} from 'react';

import {useAppDispatch} from 'hooks/redux';

import {currentWordSlice} from 'store/currentWord/slice';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';
import {Props} from './types';

const TypeForm: React.FC<Props> = ({currentWord, wordNumbers, isLoading, currentWordId, writtenText, tenseIndex, tenseVariants, tenseVariantIndex, nextWordId}) => {
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
    const currentWordVariant = tenseVariants[tenseVariantIndex].variant;

    dispatch(currentWordSlice.actions.onCheckInputLetter(writtenText));

    if (writtenText.length !== currentWordVariant.length || writtenText !== currentWordVariant.toLowerCase()) return;

    dispatch(currentWordSlice.actions.onCheckEnteredWord());

    if (!currentWord || tenseVariantIndex !== tenseVariants.length - 1) return;

    if (tenseIndex !== currentWord.tenses.length - 1) {
      dispatch(currentWordSlice.actions.onNextTense());
    } else {
      if (nextWordId) dispatch(currentWordSlice.actions.onChangeWord(nextWordId));
    }
  };

  useEffect(() => {
    if (currentWord) {
      dispatch(currentWordSlice.actions.initWord(currentWord.tenses[tenseIndex]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, currentWordId, tenseIndex]);

  return (
    <div className={styles.typeForm}>
      {/* we should stay `autofocus` on the field, because we need faster access to the field */}
      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <TypeFormTextField onChange={onChangeInput} onKeyDown={onKeyDownInput} onKeyUp={onKeyUpInput} value={writtenText} autoFocus fullWidth />
      <TypeFormFormHelperText className={styles.helperText}>Type the word by letters</TypeFormFormHelperText>
    </div>
  );
};

export default TypeForm;
