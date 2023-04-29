import React from 'react';

import Button from '@mui/material/Button';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {currentWordSlice} from 'store/currentWord/slice';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';
import {Props} from './types';

const TypeForm: React.FC<Props> = ({typeFormInputRef}) => {
  const dispatch = useAppDispatch();
  const {entities: words} = useAppSelector((state) => state.wordsReducer);
  const {currentWordIndex, writtenText, isTenseVariantCorrectlyTyped} = useAppSelector((state) => state.currentWordReducer);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;

    dispatch(currentWordSlice.actions.writeText(inputValue));
  };

  const handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!/^[a-zA-Z)]+$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (/^[a-zA-Z)]+$/.test(event.key) && event.key.length === 1) {
      dispatch(currentWordSlice.actions.checkTenseVariant(writtenText));
    }
  };

  const handleNextWord = (): void => {
    const nextWordId = words[currentWordIndex + 1]?.id;

    dispatch(currentWordSlice.actions.changeWord(nextWordId));
  };

  return (
    <div className={styles.typeForm}>
      {!isTenseVariantCorrectlyTyped ? (
        <>
          {/* we should stay `autofocus` on the field, because we need faster access to the field */}
          <TypeFormTextField inputRef={typeFormInputRef} onChange={handleChangeInput} onKeyDown={handleKeyDownInput} onKeyUp={handleKeyUpInput} value={writtenText} fullWidth />
          <TypeFormFormHelperText className={styles.helperText}>Type the word by letters</TypeFormFormHelperText>
        </>
      ) : (
        <>
          {/* we should stay `autofocus` on the button, because we need faster access to the field */}
          {/* eslint-disable-next-line jsx-a11y/no-autofocus */}
          <Button onClick={() => handleNextWord()} variant="contained" size="large" autoFocus fullWidth>
            Next word
          </Button>
        </>
      )}
    </div>
  );
};

export default TypeForm;
