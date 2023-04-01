import React, {useEffect, useState} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import ResetPasswordDialog from 'components/ResetPasswordDialog';

import EmailPasswordProvider from './EmailPasswordProvider';
import SocialProviders from './SocialProviders';
import {Props, StateDialog} from './types';

const SignInDialog: React.FC<Props> = ({handleOpenClose, isOpen}) => {
  const [stateDialog, setStateDialog] = useState<StateDialog>('signIn');
  const isStateDialogSignIn = stateDialog === 'signIn';
  const [isOpenResetPasswordDialog, setOpenResetPasswordDialog] = React.useState(false);

  const handleOpenCloseResetPasswordDialog = (value?: boolean) => {
    setOpenResetPasswordDialog((prevState) => (value === undefined ? !prevState : value));
  };

  const handleChangeStateDialog = (value: StateDialog): void => {
    setStateDialog(value);
  };

  useEffect(() => {
    if (isOpen) setStateDialog('signIn');
  }, [isOpen]);

  return (
    <>
      <Dialog onClose={() => handleOpenClose()} open={isOpen} maxWidth="xs" fullWidth>
        <DialogTitle sx={{textAlign: 'center'}}>{isStateDialogSignIn ? 'Sign In' : 'Sign Up'}</DialogTitle>
        <DialogContent>
          <SocialProviders handleOpenClose={handleOpenClose} />
          <Divider sx={{mt: 3, mb: 3}}>or</Divider>
          <EmailPasswordProvider stateDialog={stateDialog} handleOpenClose={handleOpenClose} />
          <Typography align="center">
            {isStateDialogSignIn && (
              <>
                <Link
                  onClick={() => {
                    handleOpenClose();
                    handleOpenCloseResetPasswordDialog();
                  }}
                  component="button"
                  type="button"
                  variant="body1"
                >
                  Reset password
                </Link>
                <br />
              </>
            )}
            {isStateDialogSignIn ? 'No account?' : 'Already have an account?'}{' '}
            <Link onClick={() => handleChangeStateDialog(isStateDialogSignIn ? 'signUp' : 'signIn')} component="button" type="button" variant="body1">
              {isStateDialogSignIn ? 'Create' : 'Sign In'}
            </Link>
          </Typography>
        </DialogContent>
      </Dialog>
      <ResetPasswordDialog handleOpenClose={handleOpenCloseResetPasswordDialog} isOpen={isOpenResetPasswordDialog} />
    </>
  );
};

export default SignInDialog;
