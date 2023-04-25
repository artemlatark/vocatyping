import React from 'react';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {currentWordSlice} from 'store/currentWord/slice';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';

const TypeForm = () => {
  const dispatch = useAppDispatch();
  const {words} = useAppSelector((state) => state.wordsReducer);
  const {currentWord, currentWordIndex, writtenText, tenseIndex, tenseVariants, tenseVariantIndex} = useAppSelector((state) => state.currentWordReducer);

  const handleChangeInput: React.ChangeEventHandler<HTMLInputElement> = (event): void => {
    const inputValue = event.currentTarget.value;

    dispatch(currentWordSlice.actions.writeText(inputValue));
  };

  const handleKeyDownInput: React.KeyboardEventHandler<HTMLInputElement> = (event): void => {
    if (/^[а-яА-ЯёЁ)]+$/.test(event.key) || /Enter|Backspace|Space/.test(event.code)) {
      event.preventDefault();
    }
  };

  const handleKeyUpInput = (): void => {
    const currentWordVariant = tenseVariants[tenseVariantIndex].variant;

    dispatch(currentWordSlice.actions.checkEnteredTenseVariant(writtenText));

    if (writtenText.length !== currentWordVariant.length || writtenText !== currentWordVariant.toLowerCase()) return;

    dispatch(currentWordSlice.actions.setTenseEnteredAsChecked());

    if (!currentWord || tenseVariantIndex !== tenseVariants.length - 1) return;

    if (tenseIndex !== currentWord.tenses.length - 1) {
      dispatch(currentWordSlice.actions.nextTense());
    } else {
      const nextWordId = words[currentWordIndex]?.id;

      if (nextWordId) dispatch(currentWordSlice.actions.changeWord(nextWordId));
    }
  };

  return (
    <div className={styles.typeForm}>
      {/* we should stay `autofocus` on the field, because we need faster access to the field */}
      {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
      <TypeFormTextField onChange={handleChangeInput} onKeyDown={handleKeyDownInput} onKeyUp={handleKeyUpInput} value={writtenText} autoFocus fullWidth />
      <TypeFormFormHelperText className={styles.helperText}>Type the word by letters</TypeFormFormHelperText>
    </div>
  );
};

export default TypeForm;
