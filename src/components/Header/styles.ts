import {styled, AppBar, AppBarProps} from '@mui/material';

export const AppBarCustom = styled(AppBar)<AppBarProps>(({theme}) => ({
  '&': {
    backgroundColor: theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(18, 18, 18, 0.4)',
    backdropFilter: 'blur(8px)',
  },
}));
