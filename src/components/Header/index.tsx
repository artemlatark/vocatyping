import React, {useEffect} from 'react';
import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';

import {auth} from 'config/firebase';
import {useAppDispatch} from 'hooks/redux';
import {useKeyPress} from 'hooks/useKeyPress';
import {currentWordSlice} from 'store/currentWord/slice';
import SignInDialog from 'components/SignInDialog';
import Pagination from 'components/Pagination';
import UserProfileHeader from 'components/UserProfileHeader';

import {Props} from './types';
import {AppBarCustom} from './styles';

const Header: React.FC<Props> = React.memo(({onOpenSidebar, wordNumbers, currentWordId}) => {
  const dispatch = useAppDispatch();
  const [user] = useAuthState(auth);
  const [signOut] = useSignOut(auth);
  const pressedAlt = useKeyPress('Alt');
  const pressedArrowLeft = useKeyPress('ArrowLeft');
  const pressedArrowRight = useKeyPress('ArrowRight');
  const [isOpenSignInDialog, setOpenSignInDialog] = React.useState(false);

  const handleOpenCloseSignInDialog = (value?: boolean) => {
    setOpenSignInDialog((prevState) => (value === undefined ? !prevState : value));
  };

  const onChangeWord = (handlerType: string): void => {
    dispatch(currentWordSlice.actions.onChangeWord({handlerType, wordNumbers}));
  };

  useEffect(() => {
    if (pressedAlt && pressedArrowLeft) {
      dispatch(currentWordSlice.actions.onChangeWord({handlerType: 'prev', wordNumbers}));
    }
    if (pressedAlt && pressedArrowRight) {
      dispatch(currentWordSlice.actions.onChangeWord({handlerType: 'next', wordNumbers}));
    }

    onOpenSidebar(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pressedAlt, pressedArrowLeft, pressedArrowRight]);

  return (
    <>
      <AppBarCustom position="fixed" sx={{alignItems: 'center'}}>
        <Toolbar sx={{maxWidth: 990, width: '100%'}}>
          <Grid wrap="nowrap" container>
            <Grid alignItems="center" container item>
              <IconButton onClick={() => onOpenSidebar()} color="primary">
                <MenuIcon />
              </IconButton>
              <Divider orientation="vertical" flexItem sx={{ml: 1, mr: 1}} />
              <Pagination
                handlePrev={() => onChangeWord('prev')}
                handleNext={() => onChangeWord('next')}
                currentNumber={currentWordId}
                allNumbers={wordNumbers}
              />
            </Grid>
            <Grid justifyContent="end" container item>
              {user ? (
                <UserProfileHeader user={user} signOut={async () => await signOut()} />
              ) : (
                <>
                  <Button onClick={() => handleOpenCloseSignInDialog()} variant="outlined">
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
