import React from 'react';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {currentWordSlice} from 'store/currentWord/slice';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';

const TypeForm = () => {
  const dispatch = useAppDispatch();
  const {words} = useAppSelector((state) => state.wordsReducer);
  const {currentWord, currentWordIndex, writtenText, tenseIndex, tenseVariants, tenseVariantIndex, isTenseVariantsCorrectlyTyped} = useAppSelector(
    (state) => state.currentWordReducer
  );

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;

    dispatch(currentWordSlice.actions.writeText(inputValue));
  };

  const handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (/^[а-яА-ЯёЁ)]+$/.test(event.key) || /Enter|Backspace|Space/.test(event.code)) {
      event.preventDefault();
    }
  };

  const handleKeyUpInput = (): void => {
    dispatch(currentWordSlice.actions.checkTenseVariant(writtenText));

    // if (!currentWord || tenseVariantIndex !== tenseVariants.length - 1) return;
    //
    // if (tenseIndex !== currentWord.tenses.length - 1) {
    //   dispatch(currentWordSlice.actions.nextTense());
    // } else {
    //   const nextWordId = words[currentWordIndex]?.id;
    //
    //   if (nextWordId) dispatch(currentWordSlice.actions.changeWord(nextWordId));
    // }
  };

  const handleNextWord = (): void => {
    const nextWordId = words[currentWordIndex + 1]?.id;

    dispatch(currentWordSlice.actions.changeWord(nextWordId));
  };

  return (
    <div className={styles.typeForm}>
      {!isTenseVariantsCorrectlyTyped ? (
        <>
          {/* we should stay `autofocus` on the field, because we need faster access to the field */}
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <TypeFormTextField onChange={handleChangeInput} onKeyDown={handleKeyDownInput} onKeyUp={handleKeyUpInput} value={writtenText} autoFocus fullWidth />
          <TypeFormFormHelperText className={styles.helperText}>Type the word by letters</TypeFormFormHelperText>
        </>
      ) : (
        <>
          {/* we should stay `autofocus` on the button, because we need faster access to the field */}
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <Button onClick={() => handleNextWord()} autoFocus>
            Next word
          </Button>
        </>
      )}
    </div>
  );
};

export default TypeForm;
