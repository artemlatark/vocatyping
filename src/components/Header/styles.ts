import {styled, AppBar} from '@mui/material';

export const AppBarCustom = styled(AppBar)({
  '&': {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    backdropFilter: 'blur(8px)',
  },
});
