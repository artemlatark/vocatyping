import {FC, memo, useState} from 'react';

import {useAuthState, useSignOut} from 'react-firebase-hooks/auth';

import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';

import {firebaseAuth} from 'config/firebase';

import SignInDialog from 'components/SignInDialog';
import UserProfileHeader from 'components/UserProfileHeader';

import {AppBarCustom, ToolbarCustom} from './styles';
import {Props} from './types';

const Header: FC<Props> = ({handleOpenSidebar}) => {
  const [isOpenSignInDialog, setOpenSignInDialog] = useState(false);
  const [user] = useAuthState(firebaseAuth);
  const [signOut] = useSignOut(firebaseAuth);

  const handleOpenCloseSignInDialog = (value: boolean): void => {
    setOpenSignInDialog(value);
  };

  return (
    <>
      <AppBarCustom position="fixed" color="transparent">
        <ToolbarCustom>
          <IconButton onClick={() => handleOpenSidebar('dictionary')} color="primary">
            <MenuIcon />
          </IconButton>
          <Box sx={{flex: '1 1 auto'}} />
          <Stack direction="row" spacing={1}>
            <IconButton onClick={() => handleOpenSidebar('settings')}>
              <SettingsIcon />
            </IconButton>
            <Divider orientation="vertical" flexItem />
            <Box sx={{marginLeft: '16px !important'}}>
              {user ? (
                <UserProfileHeader user={user} signOut={signOut} />
              ) : (
                <Button onClick={() => handleOpenCloseSignInDialog(true)} variant="outlined">
                  Sign In
                </Button>
              )}
            </Box>
          </Stack>
        </ToolbarCustom>
      </AppBarCustom>
      <SignInDialog isOpen={isOpenSignInDialog} handleOpenClose={handleOpenCloseSignInDialog} />
    </>
  );
};

export default memo(Header);
