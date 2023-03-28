import React from 'react';

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Divider from '@mui/material/Divider';

import SocialProviders from './SocialProviders';
import EmailPasswordProvider from './EmailPasswordProvider';
import {Props} from './types';

const SignInDialog: React.FC<Props> = ({handleOpen, isOpen}) => {
  return (
    <Dialog onClose={() => handleOpen()} open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle sx={{textAlign: 'center'}}>Sign In</DialogTitle>
      <DialogContent>
        <SocialProviders handleOpen={handleOpen} />
        <Divider sx={{mt: 2, mb: 2}}>or</Divider>
        <EmailPasswordProvider />
      </DialogContent>
    </Dialog>
  );
};

export default SignInDialog;
