import {styled, Tabs, Tab} from '@mui/material';

export const TabsCustom = styled(Tabs)({
  '&': {
    height: '100%',
  },
});

export const TabCustom = styled(Tab)({
  minWidth: 60,
  '&.Mui-selected': {
    fontWeight: 600,
  },
});
