import {styled, ListItem, ListSubheader, Typography} from '@mui/material';

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

export const ListSubheaderCustom = styled(ListSubheader)({
  '&': {
    backgroundColor: 'white',
    color: 'black',
    fontWeight: 600,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
});
