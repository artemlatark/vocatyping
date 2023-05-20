import React, {useEffect, useRef} from 'react';

import Button from '@mui/material/Button';

import {useAppDispatch, useAppSelector} from 'hooks/redux';

import {changeWord, checkTenseVariant, initWord, writeText} from 'store/currentWord/slice';

import styles from './index.module.css';
import {TypeFormTextField, TypeFormFormHelperText} from './styles';

const TypeForm = () => {
  const dispatch = useAppDispatch();
  const {entities: words} = useAppSelector((state) => state.wordsReducer);
  const {currentWordIndex, writtenText, isTenseVariantCorrectlyTyped} = useAppSelector((state) => state.currentWordReducer);
  const textFieldTypeWordRef = useRef<HTMLInputElement | null>(null);
  const buttonNextWordRef = useRef<HTMLButtonElement | null>(null);

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const inputValue = event.currentTarget.value;

    dispatch(writeText(inputValue));
  };

  const handleKeyDownInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (!/^[a-zA-Z)]+$/.test(event.key)) {
      event.preventDefault();
    }
  };

  const handleKeyUpInput = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (/^[a-zA-Z)]+$/.test(event.key) && event.key.length === 1) {
      dispatch(checkTenseVariant(writtenText));
    }
  };

  const handleNextWord = (): void => {
    const word = words[currentWordIndex + 1];

    dispatch(changeWord(word.id));
    dispatch(initWord(word));
  };

  useEffect(() => {
    if (!isTenseVariantCorrectlyTyped) {
      textFieldTypeWordRef.current?.focus();
    } else {
      buttonNextWordRef.current?.focus();
    }
  }, [currentWordIndex, isTenseVariantCorrectlyTyped]);

  return (
    <div className={styles.typeForm}>
      {!isTenseVariantCorrectlyTyped ? (
        <>
          <TypeFormTextField
            name="typingText"
            inputRef={textFieldTypeWordRef}
            onChange={handleChangeInput}
            onKeyDown={handleKeyDownInput}
            onKeyUp={handleKeyUpInput}
            value={writtenText}
            fullWidth
          />
          <TypeFormFormHelperText className={styles.helperText}>Type the word by letters</TypeFormFormHelperText>
        </>
      ) : (
        <Button ref={buttonNextWordRef} onClick={() => handleNextWord()} variant="contained" size="large" fullWidth>
          Next word
        </Button>
      )}
    </div>
  );
};

export default TypeForm;
