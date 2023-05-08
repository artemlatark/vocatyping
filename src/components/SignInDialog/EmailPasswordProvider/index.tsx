import React, {useState} from 'react';

import {useForm, Controller, SubmitHandler} from 'react-hook-form';

import {yupResolver} from '@hookform/resolvers/yup';
import {logEvent} from 'firebase/analytics';
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';

import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import {ENV} from 'config/config';
import {firebaseAnalytics, firebaseAuth} from 'config/firebase';

import {defaultValues, schema} from './formSchema';
import {Props, FormData} from './types';

const EmailPasswordProvider: React.FC<Props> = ({stateDialog, handleOpenClose}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [createUserWithEmailAndPassword, , createLoading, createError] = useCreateUserWithEmailAndPassword(firebaseAuth, {
    sendEmailVerification: true,
  });
  const [signInWithEmailAndPassword, , signInLoading, signInError] = useSignInWithEmailAndPassword(firebaseAuth);
  const [showPassword, setShowPassword] = useState(false);
  const isStateDialogSignIn = stateDialog === 'signIn';
  const loading = isStateDialogSignIn ? signInLoading : createLoading;
  const error = isStateDialogSignIn ? signInError : createError;

  const handleShowPassword = (): void => {
    setShowPassword((show) => !show);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormData> = async ({email, password}): Promise<void> => {
    const user = isStateDialogSignIn ? await signInWithEmailAndPassword(email, password) : await createUserWithEmailAndPassword(email, password);

    if (user) {
      handleOpenClose(false);

      if (ENV === 'production' && firebaseAnalytics) {
        if (isStateDialogSignIn) {
          logEvent(firebaseAnalytics, 'login', {method: 'Email/Password'});
        } else {
          logEvent(firebaseAnalytics, 'sign_up', {method: 'Email/Password'});
        }
      }
    }
  };

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component="form"
      sx={{
        '& > :not(style)': {mb: 2, width: '100%'},
      }}
    >
      <Controller
        name="email"
        control={control}
        render={({field}) => (
          <TextField
            label="Email"
            placeholder="example@example.com"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            InputLabelProps={{
              shrink: true,
            }}
            {...field}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({field}) => (
          <TextField
            type={showPassword ? 'text' : 'password'}
            label="Password"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{mr: 1}}>
                  <IconButton onClick={handleShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
          />
        )}
      />
      {error && error?.message && (
        <Alert severity="error" sx={{boxSizing: 'border-box'}}>
          {error?.message}
        </Alert>
      )}
      <LoadingButton loading={loading} type="submit" variant="contained" size="large">
        {isStateDialogSignIn ? 'Log in' : 'Create account'}
      </LoadingButton>
    </Box>
  );
};

export default EmailPasswordProvider;
