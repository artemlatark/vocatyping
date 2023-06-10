import FormHelperText, {FormHelperTextProps} from '@mui/material/FormHelperText';
import Input, {InputProps} from '@mui/material/Input';
import {styled} from '@mui/material/styles';

export const TypeFormTextField = styled(Input)<InputProps>({
  '& .MuiInputBase-input': {
    fontSize: 24,
    height: 46,
    textAlign: 'center',
  },
});

export const TypeFormFormHelperText = styled(FormHelperText)<FormHelperTextProps>({
  '&': {
    textAlign: 'center',
  },
});
