import {ListItem, ListSubheader, Typography, ListItemButtonProps, ListItemButton} from '@mui/material';
import {blue} from '@mui/material/colors';
import {styled} from '@mui/material/styles';

export const TypographyCustom = styled(Typography)({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
});

export const ListItemCustom = styled(ListItem)({
  padding: 0,
});

export const ListItemButtonCustom = styled(ListItemButton)<ListItemButtonProps>(({theme, selected}) => ({
  color: selected ? (theme.palette.mode === 'light' ? blue[600] : blue[200]) : 'inherit',
  fontWeight: selected ? 600 : 'inherit',
}));

export const ListSubheaderCustom = styled(ListSubheader)(({theme}) => ({
  backgroundColor: theme.palette.mode === 'light' ? 'white' : '#353535',
  color: theme.palette.mode === 'light' ? 'black' : 'white',
  fontWeight: 600,
  fontSize: 20,
  paddingBottom: 10,
  paddingTop: 10,
}));
