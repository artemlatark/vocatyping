import React, {useState} from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';

import {FormData} from './types';
import {defaultValues, schema} from './formSchema';

const EmailPasswordProvider = () => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    defaultValues,
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
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
      <Button type="submit" variant="contained" size="large">
        Log in
      </Button>
    </Box>
  );
};

export default EmailPasswordProvider;
