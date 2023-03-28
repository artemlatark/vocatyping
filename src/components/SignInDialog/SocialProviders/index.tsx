import {useSignInWithGoogle} from 'react-firebase-hooks/auth';

import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import {auth} from 'config/firebase';

import {Props} from '../types';
import styles from './index.module.css';

const SocialProviders = ({handleOpen}: Pick<Props, 'handleOpen'>) => {
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = async () => {
    const isSuccessfullySignedIn = await signInWithGoogle();

    if (isSuccessfullySignedIn) handleOpen(false);
  };

  return (
    <Grid alignItems="center" direction="column" container>
      <Grid container item>
        <Button onClick={() => handleSignInWithGoogle()} variant="outlined" size="large" sx={{width: '100%'}}>
          <span className={styles.googleLogo} />
          Continue with Google
        </Button>
      </Grid>
    </Grid>
  );
};

export default SocialProviders;
