import {styled} from '@mui/material/styles';
import Tab, {TabProps} from '@mui/material/Tab';
import Tabs, {TabsProps} from '@mui/material/Tabs';

export const TabsCustom = styled(Tabs)<TabsProps>({
  height: '100%',
});

export const TabCustom = styled(Tab)<TabProps>({
  minWidth: 60,
  '&.Mui-selected': {
    fontWeight: 600,
  },
});
