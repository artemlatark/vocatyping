import {Input, FormHelperText} from '@mui/material';
import {styled} from '@mui/material/styles';

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
