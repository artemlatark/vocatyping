import {blueGrey, grey} from '@mui/material/colors';
import {styled} from '@mui/material/styles';

export const Key = styled('div')<{isNextKey: boolean; isSystemKey?: boolean; isSpace?: boolean; code?: string}>(({theme, isNextKey, isSystemKey, isSpace, code}) => ({
  backgroundColor: theme.palette.mode === 'light' ? blueGrey[50] : grey[800],
  border: theme.palette.mode === 'light' ? `1px solid ${blueGrey[200]}` : `1px solid ${grey[700]}`,
  borderRadius: '8px',
  boxSizing: 'border-box',
  color: theme.palette.mode === 'light' ? blueGrey[800] : grey[400],
  fontSize: 22,
  height: 60,
  margin: 4,
  padding: '0 4px',
  lineHeight: '60px',
  textAlign: 'center',
  transition: theme.transitions.create(['background-color'], {duration: 250}),
  userSelect: 'none',
  width: 68,
  ...(isNextKey && {
    backgroundColor: theme.palette.mode === 'light' ? blueGrey[100] : grey[700],
  }),
  ...(isSystemKey && {
    color: theme.palette.mode === 'light' ? blueGrey[600] : grey[600],
    fontSize: 14,
    padding: '0 10px',
  }),
  ...(code === 'Tab' && {
    textAlign: 'initial',
    width: 100,
  }),
  ...(code === 'CapsLock' && {
    textAlign: 'initial',
    width: 120,
  }),
  ...(code === 'ShiftLeft' && {
    textAlign: 'initial',
    width: 90,
  }),
  ...(code === 'Backspace' && {
    textAlign: 'right',
    width: 110,
  }),
  ...(code === 'ShiftRight' && {
    textAlign: 'right',
    width: 160,
  }),
  ...(code === 'Enter' &&
    !isSpace && {
      borderBottomRightRadius: 0,
      textAlign: 'right',
      width: 68,
    }),
  ...(code === 'Enter' &&
    isSpace && {
      borderTop: 0,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      height: 69,
      marginTop: -5,
      width: 60,
    }),
  ...(code === 'Space' && {
    width: 390,
  }),
  '& > span': {
    fontSize: 14,
    fontWeight: 500,
    position: 'relative',
    top: -14,
    left: 4,
  },
}));
