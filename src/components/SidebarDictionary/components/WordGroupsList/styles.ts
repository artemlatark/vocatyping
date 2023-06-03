import {Tabs, Tab} from '@mui/material';
import {styled} from '@mui/material/styles';

export const TabsCustom = styled(Tabs)({
  height: '100%',
});

export const TabCustom = styled(Tab)({
  minWidth: 60,
  '&.Mui-selected': {
    fontWeight: 600,
  },
});
