import React, {useEffect, useState} from 'react';

import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';

import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Skeleton from '@mui/material/Skeleton';
import Toolbar from '@mui/material/Toolbar';

import {firebaseAuth} from 'config/firebase';

import {useAppDispatch, useAppSelector} from 'hooks/redux';
import {useKeyPress} from 'hooks/useKeyPress';

import {initWord, changeWord} from 'store/currentWord/slice';

import {LoadingStatus} from 'models/LoadingStatus';

import Pagination from 'components/Pagination';
import SignInDialog from 'components/SignInDialog';
import UserProfileHeader from 'components/UserProfileHeader';

import {AppBarCustom} from './styles';
import {Props} from './types';

const Header: React.FC<Props> = React.memo(({handleOpenSidebar}) => {
  const dispatch = useAppDispatch();
  const {entities: words, loading: loadingWords} = useAppSelector((state) => state.wordsReducer);
  const {currentWordIndex} = useAppSelector((state) => state.currentWordReducer);

  const [user, loadingUser] = useAuthState(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');

  const [isOpenSignInDialog, setOpenSignInDialog] = useState(false);

  const wordNumbers = words.length;

  const handleOpenCloseSignInDialog = (value: boolean): void => {
    setOpenSignInDialog(value);
  };

  const handleSwitchToPrevOrNextWord = (isPrev: boolean): void => {
    const word = isPrev ? words[currentWordIndex - 1] : words[currentWordIndex + 1];

    dispatch(changeWord(word.id));
    dispatch(initWord(word));
  };

  const handleChangeWord = (handlerType: 'prev' | 'next'): void => {
    handleSwitchToPrevOrNextWord(handlerType === 'prev');
  };

  useEffect(() => {
    if (pressedAlt && (pressedArrowLeft || pressedArrowRight)) {
      handleSwitchToPrevOrNextWord(pressedArrowLeft);

      handleOpenSidebar(false);
    }
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
              <Pagination
                handlePrev={() => handleChangeWord('prev')}
                handleNext={() => handleChangeWord('next')}
                currentNumber={currentWordIndex + 1}
                allNumbers={wordNumbers}
                loading={loadingWords !== LoadingStatus.succeeded}
              />
            </Grid>
            <Grid justifyContent="end" container item>
              {!loadingUser ? (
                <>
                  {user ? (
                    <UserProfileHeader user={user} signOut={signOut} />
                  ) : (
                    <Button onClick={() => handleOpenCloseSignInDialog(true)} variant="outlined">
                      Sign In
                    </Button>
                  )}
                </>
              ) : (
                <Skeleton variant="circular" width={40} height={40} sx={{mr: 3}} />
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
