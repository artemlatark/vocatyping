import React from 'react';
import {useSignInWithGoogle} from 'react-firebase-hooks/auth';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';

import {auth} from 'config/firebase';

import {Props} from './types';
import styles from './index.module.css';

const SignInDialog: React.FC<Props> = ({handleClose, isOpen}) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = async () => {
    const isSuccessfullySignedIn = await signInWithGoogle();

    if (isSuccessfullySignedIn) handleClose();
  };

  return (
    <Dialog onClose={() => handleClose()} open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle sx={{textAlign: 'center'}}>Sign In</DialogTitle>
      <DialogContent>
        <Grid alignItems="center" direction="column" rowSpacing={2} container>
          <Grid item>
            <Button onClick={() => handleSignInWithGoogle()} variant="outlined">
              <span className={styles.googleLogo} />
              Continue with Google
            </Button>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
