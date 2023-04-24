import React, {useEffect} from 'react';

import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';

import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import {firebaseAuth} from 'config/firebase';

import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useKeyPress} from 'hooks/useKeyPress';

import {currentWordSlice} from 'store/currentWord/slice';

import Pagination from 'components/Pagination';
import SignInDialog from 'components/SignInDialog';
import UserProfileHeader from 'components/UserProfileHeader';

import {AppBarCustom} from './styles';
import {Props} from './types';

const Header: React.FC<Props> = React.memo(({handleOpenSidebar}) => {
  const dispatch = useAppDispatch();

  const {words} = useAppSelector((state) => state.wordsReducer);
  const {currentWordIndex} = useAppSelector((state) => state.currentWordReducer);

  const [user] = useAuthState(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');

  const [isOpenSignInDialog, setOpenSignInDialog] = React.useState(false);

  const wordNumbers = words.length;

  const handleOpenCloseSignInDialog = (value: boolean): void => {
    setOpenSignInDialog(value);
  };

  const onChangeWord = (handlerType: string): void => {
    const wordId = (handlerType === 'prev' ? words[currentWordIndex - 1] : words[currentWordIndex + 1])?.id;
    if (wordId) dispatch(currentWordSlice.actions.onChangeWord(wordId));
  };

  useEffect(() => {
    if (pressedAlt && pressedArrowLeft) {
      const prevWordId = words[currentWordIndex - 1]?.id;
      if (prevWordId) dispatch(currentWordSlice.actions.onChangeWord(prevWordId));
    }
    if (pressedAlt && pressedArrowRight) {
      const nextWordId = words[currentWordIndex + 1]?.id;
      if (nextWordId) dispatch(currentWordSlice.actions.onChangeWord(nextWordId));
    }

    handleOpenSidebar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedAlt, pressedArrowLeft, pressedArrowRight]);

  return (
    <>
      <AppBarCustom position="fixed" sx={{alignItems: 'center'}}>
        <Toolbar sx={{maxWidth: 990, width: '100%'}}>
          <Grid wrap="nowrap" container>
            <Grid alignItems="center" container item>
              <IconButton onClick={() => handleOpenSidebar()} color="primary">
                <MenuIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ml: 1, mr: 1}} />
              <Pagination handlePrev={() => onChangeWord('prev')} handleNext={() => onChangeWord('next')} currentNumber={currentWordIndex + 1} allNumbers={wordNumbers} />
            </Grid>
            <Grid justifyContent="end" container item>
              {user ? (
                <UserProfileHeader user={user} signOut={signOut} />
              ) : (
                <>
                  <Button onClick={() => handleOpenCloseSignInDialog(true)} variant="outlined">
                    Sign In
                  </Button>
                </>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBarCustom>
      <SignInDialog handleOpenClose={handleOpenCloseSignInDialog} isOpen={isOpenSignInDialog} />
    </>
  );
});

export default Header;
