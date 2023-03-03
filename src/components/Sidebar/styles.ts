import {styled, ListItem, ListSubheader} from '@mui/material';

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
