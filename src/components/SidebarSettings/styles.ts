import Box, {BoxProps} from '@mui/material/Box';
import {grey} from '@mui/material/colors';
import {styled} from '@mui/material/styles';
import Typography, {TypographyProps} from '@mui/material/Typography';

export const OptionsContainer = styled(Box)<BoxProps>(({theme}) => ({
  '&:not(:last-child)': {
    marginBottom: theme.spacing(3),
  },
}));

export const TitleContainer = styled(Typography)<TypographyProps>(({theme}) => ({
  color: theme.palette.mode === 'light' ? grey[700] : grey[500],
  fontWeight: 600,
  textTransform: 'uppercase',
}));
