import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

import {Props} from './types';
import {
  useSignInWithApple,
  useSignInWithFacebook,
  useSignInWithGoogle,
  useSignInWithTwitter,
} from 'react-firebase-hooks/auth';
import {auth} from '../../config/firebase';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';

const SignInDialog: React.FC<Props> = ({handleClose, isOpen}) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithFacebook] = useSignInWithFacebook(auth);
  const [signInWithApple] = useSignInWithApple(auth);
  const [signInWithTwitter] = useSignInWithTwitter(auth);

  return (
    <Dialog onClose={() => handleClose(false)} open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle sx={{textAlign: 'center'}}>Sign In</DialogTitle>
      <DialogContent>
        <Grid alignItems="center" direction="column" rowSpacing={2} container>
          <Grid item>
            <Button onClick={() => signInWithGoogle()} variant="outlined">
              Continue with Google
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => signInWithFacebook()} variant="outlined">
              Continue with Facebook
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => signInWithApple()} variant="outlined">
              Continue with Apple
            </Button>
          </Grid>
          <Grid item>
            <Button onClick={() => signInWithTwitter()} variant="outlined">
              Continue with Twitter
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
