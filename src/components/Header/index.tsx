import React, {useCallback, useEffect, useState} from 'react';

import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';

import {firebaseAuth} from 'config/firebase';

import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useKeyPress} from 'hooks/useKeyPress';

import {initWord, changeWord} from 'store/currentWord/slice';

import {LoadingStatus} from 'models/LoadingStatus';
import {Word} from 'models/Word';

import Pagination from 'components/Pagination';
import SignInDialog from 'components/SignInDialog';
import UserProfileHeader from 'components/UserProfileHeader';

import {AppBarCustom} from './styles';
import {Props} from './types';

const Header: React.FC<Props> = React.memo(({handleOpenSidebar}) => {
  const dispatch = useAppDispatch();
  const {entities: words, loading: loadingWords} = useAppSelector((state) => state.wordsReducer);
  const {currentWordId, currentWordIndex} = useAppSelector((state) => state.currentWordReducer);

  const [user] = useAuthState(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');

  const [isOpenSignInDialog, setOpenSignInDialog] = useState(false);

  const wordNumbers = words.length;

  const handleOpenCloseSignInDialog = (value: boolean): void => {
    setOpenSignInDialog(value);
  };

  // TODO: see https://github.com/artemkrynkin/typerighting/issues/74
  const handleSwitchToPrevOrNextWord = useCallback(
    (currentWordIndex: number, words: Word[], isPrev: boolean): void => {
      const word = isPrev ? words[currentWordIndex - 1] : words[currentWordIndex + 1];

      dispatch(changeWord(word.id));
      dispatch(initWord(word));

      handleOpenSidebar('dictionary', false);
    },
    [dispatch, handleOpenSidebar]
  );

  const handleChangeWord = useCallback(
    (handlerType: 'prev' | 'next'): void => {
      handleSwitchToPrevOrNextWord(currentWordIndex, words, handlerType === 'prev');
    },
    [currentWordIndex, handleSwitchToPrevOrNextWord, words]
  );

  useEffect(() => {
    if (pressedAlt && (pressedArrowLeft || pressedArrowRight)) {
      handleChangeWord(pressedArrowLeft ? 'prev' : 'next');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedAlt, pressedArrowLeft, pressedArrowRight]);

  return (
    <>
      <AppBarCustom position="fixed" sx={{alignItems: 'center'}}>
        <Toolbar sx={{maxWidth: 990, width: '100%'}}>
          <Grid container item>
            <Grid item>
              <IconButton onClick={() => handleOpenSidebar('dictionary')} color="primary">
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ml: 1, mr: 1}}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item>
              <Pagination
                handlePrev={() => handleChangeWord('prev')}
                handleNext={() => handleChangeWord('next')}
                currentNumber={currentWordId}
                allNumbers={wordNumbers}
                loading={loadingWords !== LoadingStatus.succeeded}
              />
            </Grid>
          </Grid>
          <Grid justifyContent="end" container item>
            <Grid item>
              <IconButton onClick={() => handleOpenSidebar('settings')}>
                <SettingsIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ml: 1, mr: 1}}>
              <Divider orientation="vertical" />
            </Grid>
            <Grid item sx={{ml: 1}}>
              {user ? (
                <UserProfileHeader user={user} signOut={signOut} />
              ) : (
                <Button onClick={() => handleOpenCloseSignInDialog(true)} variant="outlined">
                  Sign In
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBarCustom>
      <SignInDialog isOpen={isOpenSignInDialog} handleOpenClose={handleOpenCloseSignInDialog} />
    </>
  );
});

export default Header;
