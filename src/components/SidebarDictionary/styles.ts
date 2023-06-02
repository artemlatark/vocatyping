import {styled, ListItem, ListSubheader, Typography, ListSubheaderProps} from '@mui/material';

export const TypographyCustom = styled(Typography)({
  alignItems: 'center',
  display: 'flex',
  height: '100%',
  justifyContent: 'center',
});

export const ListItemCustom = styled(ListItem)({
  '&': {
    padding: 0,
  },
});

export const ListSubheaderCustom = styled(ListSubheader)<ListSubheaderProps>(({theme}) => ({
  '&': {
    backgroundColor: theme.palette.mode === 'light' ? 'white' : '#353535',
    color: theme.palette.mode === 'light' ? 'black' : 'white',
    fontWeight: 600,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
}));
