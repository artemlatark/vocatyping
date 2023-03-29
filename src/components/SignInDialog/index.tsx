import React, {useState} from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

import SocialProviders from './SocialProviders';
import EmailPasswordProvider from './EmailPasswordProvider';
import {Props, StateDialog} from './types';

const SignInDialog: React.FC<Props> = ({handleOpen, isOpen}) => {
  const [stateDialog, setStateDialog] = useState<StateDialog>('signIn');
  const isStateDialogSignIn = stateDialog === 'signIn';

  const handleChangeStateDialog = (value: StateDialog): void => {
    setStateDialog(value);
  };

  return (
    <Dialog onClose={() => handleOpen()} open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle sx={{textAlign: 'center'}}>{isStateDialogSignIn ? 'Sign In' : 'Sign Up'}</DialogTitle>
      <DialogContent>
        <SocialProviders handleOpen={handleOpen} />
        <Divider sx={{mt: 3, mb: 3}}>or</Divider>
        <EmailPasswordProvider stateDialog={stateDialog} />
        <Typography align="center">
          {isStateDialogSignIn ? 'No account?' : 'Already have an account?'}{' '}
          <Link
            component="button"
            variant="body1"
            onClick={() => handleChangeStateDialog(isStateDialogSignIn ? 'signUp' : 'signIn')}
          >
            {isStateDialogSignIn ? 'Create' : 'Sign In'}
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
