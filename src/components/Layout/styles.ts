import {styled} from '@mui/material/styles';

export const LayoutContainer = styled('div')(({theme}) => ({
  boxSizing: 'border-box',
  height: '100%',
  padding: `${theme.spacing(8)} ${theme.spacing(3)} ${theme.spacing(3)}`,
}));
