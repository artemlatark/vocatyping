import {styled, Input, FormHelperText} from '@mui/material';

export const TypeFormTextField = styled(Input)({
  '& .MuiInputBase-input': {
    fontSize: 24,
    height: 46,
    textAlign: 'center',
  },
});

export const TypeFormFormHelperText = styled(FormHelperText)({
  '&': {
    textAlign: 'center',
  },
});
