import {blue} from '@mui/material/colors';
import ListItem, {ListItemProps} from '@mui/material/ListItem';
import ListItemButton, {ListItemButtonProps} from '@mui/material/ListItemButton';
import ListSubheader, {ListSubheaderProps} from '@mui/material/ListSubheader';
import {styled} from '@mui/material/styles';
import Typography, {TypographyProps} from '@mui/material/Typography';

export const TypographyCustom = styled(Typography)<TypographyProps>({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
});

export const ListItemCustom = styled(ListItem)<ListItemProps>({
  padding: 0,
});

export const ListItemButtonCustom = styled(ListItemButton)<ListItemButtonProps>(({theme, selected}) => ({
  color: selected ? (theme.palette.mode === 'light' ? blue[600] : blue[200]) : 'inherit',
  fontWeight: selected ? 600 : 'inherit',
}));

export const ListSubheaderCustom = styled(ListSubheader)<ListSubheaderProps>(({theme}) => ({
  backgroundColor: theme.palette.mode === 'light' ? 'white' : '#353535',
  color: theme.palette.mode === 'light' ? 'black' : 'white',
  fontWeight: 600,
  fontSize: 20,
  paddingBottom: 10,
  paddingTop: 10,
}));
