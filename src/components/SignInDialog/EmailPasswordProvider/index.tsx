import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {useCreateUserWithEmailAndPassword, useSignInWithEmailAndPassword} from 'react-firebase-hooks/auth';

import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Alert from '@mui/material/Alert';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import {auth} from 'config/firebase';

import {Props, FormData} from './types';
import {defaultValues, schema} from './formSchema';

const EmailPasswordProvider: React.FC<Props> = ({stateDialog, handleOpenClose}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [createUserWithEmailAndPassword, , createLoading, createError] = useCreateUserWithEmailAndPassword(auth, {
    sendEmailVerification: true,
  });
  const [signInWithEmailAndPassword, , signInLoading, signInError] = useSignInWithEmailAndPassword(auth);
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
    const userResponse = isStateDialogSignIn
      ? await signInWithEmailAndPassword(email, password)
      : await createUserWithEmailAndPassword(email, password);

    if (userResponse) {
      handleOpenClose();
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
      {error && error?.code && (
        <Alert severity="error" sx={{boxSizing: 'border-box'}}>
          {error?.code}
        </Alert>
      )}
      <LoadingButton loading={loading} type="submit" variant="contained" size="large">
        {isStateDialogSignIn ? 'Log in' : 'Create account'}
      </LoadingButton>
    </Box>
  );
};

export default EmailPasswordProvider;
