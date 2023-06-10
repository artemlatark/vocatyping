import AppBar, {AppBarProps} from '@mui/material/AppBar';
import {styled} from '@mui/material/styles';
import Toolbar, {ToolbarProps} from '@mui/material/Toolbar';

export const AppBarCustom = styled(AppBar)<AppBarProps>({
  alignItems: 'center',
  backdropFilter: 'blur(8px)',
});

export const ToolbarCustom = styled(Toolbar)<ToolbarProps>({
  maxWidth: 990,
  width: '100%',
});
