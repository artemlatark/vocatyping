import React, {useEffect, useState} from 'react';

import {Controller, SubmitHandler, useForm} from 'react-hook-form';

import {yupResolver} from '@hookform/resolvers/yup';
import {useSendPasswordResetEmail} from 'react-firebase-hooks/auth';

import LoadingButton from '@mui/lab/LoadingButton';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {auth} from 'config/firebase';

import {defaultValues, schema} from './formSchema';
import {Props, FormData} from './types';

const ResetPasswordDialog: React.FC<Props> = ({handleOpenClose, isOpen}) => {
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: {isDirty, errors},
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const [isSuccessfullyEmailSend, setSuccessfullyEmailSend] = useState(false);

  const onSubmit: SubmitHandler<FormData> = async ({email}): Promise<void> => {
    const requestStatus = await sendPasswordResetEmail(email);

    setSuccessfullyEmailSend(requestStatus);
  };

  useEffect(() => {
    if (!isOpen && isDirty) {
      reset(defaultValues);
    }
  }, [isOpen, isDirty, reset]);

  return (
    <Dialog onClose={() => handleOpenClose()} open={isOpen} maxWidth="xs" fullWidth>
      <DialogTitle sx={{textAlign: 'center'}}>Enter your email to reset password</DialogTitle>
      <DialogContent sx={{'.MuiDialogTitle-root+&': {pt: 2.5}}}>
        {!isSuccessfullyEmailSend ? (
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
            {error && error?.message && (
              <Alert severity="error" sx={{boxSizing: 'border-box'}}>
                {error?.message}
              </Alert>
            )}
            <LoadingButton loading={sending} type="submit" variant="contained" size="large">
              Reset password
            </LoadingButton>
          </Box>
        ) : (
          <Typography align="center" gutterBottom>
            If an account exists for {getValues('email')}, you will get an email with instructions on resetting your password. If it doesn't arrive, be sure to check your spam folder.
          </Typography>
        )}
        <Typography align="center">
          <Link onClick={() => handleOpenClose()} component="button" type="button" variant="body1">
            Cancel
          </Link>
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default ResetPasswordDialog;
