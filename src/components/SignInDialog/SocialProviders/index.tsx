import {useSignInWithGoogle} from 'react-firebase-hooks/auth';

import LoadingButton from '@mui/lab/LoadingButton';
import Grid from '@mui/material/Grid';

import {auth} from 'config/firebase';

import GoogleIconSvg from './GoogleIconSvg';
import {Props} from '../types';

const SocialProviders = ({handleOpenClose}: Pick<Props, 'handleOpenClose'>) => {
  const [signInWithGoogle, , loading] = useSignInWithGoogle(auth);

  const handleSignInWithGoogle = async (): Promise<void> => {
    const isSuccessfullySignedIn = await signInWithGoogle();

    if (isSuccessfullySignedIn) handleOpenClose(false);
  };

  return (
    <Grid alignItems="center" direction="column" container>
      <Grid container item>
        <LoadingButton
          loading={loading}
          onClick={() => handleSignInWithGoogle()}
          startIcon={<GoogleIconSvg viewBox="0 0 20 20" />}
          variant="outlined"
          size="large"
          sx={{width: '100%', '.MuiLoadingButton-startIconLoadingCenter': {opacity: 0}}}
        >
          <span>Continue with Google</span>
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default SocialProviders;
