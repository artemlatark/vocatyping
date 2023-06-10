import {grey, teal} from '@mui/material/colors';
import {styled} from '@mui/material/styles';

export const WordAndSentenceConatiner = styled('div')(({theme}) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  margin: `${theme.spacing(2)} auto 0`,
  textAlign: 'center',
}));

export const TensesOfWordContainer = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'light' ? grey[800] : grey[300],
  fontSize: 30,
  letterSpacing: 2,
  lineHeight: '36px',
}));

export const TenseVariantButton = styled('button')<{selected: boolean}>(({theme, selected}) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: !selected ? 'inherit' : theme.palette.mode === 'light' ? grey[900] : '#fff',
  fontSize: 'inherit',
  fontWeight: !selected ? 'inherit' : 600,
  letterSpacing: 'inherit',
  padding: 0,
}));

export const SentencesOfWordContainer = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'light' ? grey[600] : grey[500],
  fontSize: 22,
  lineHeight: '26px',
  fontStyle: 'italic',
  marginTop: theme.spacing(2),
}));

export const WordVariant = styled('span')<{correct: boolean}>(({theme, correct}) => ({
  color: !correct ? (theme.palette.mode === 'light' ? grey[800] : grey[300]) : theme.palette.mode === 'light' ? teal[500] : teal['A400'],
  fontSize: !correct ? 34 : 24,
  lineHeight: '34px',
  fontWeight: !correct ? 'inherit' : 600,
  textAlign: 'left',
  transition: theme.transitions.create(['font-size', 'font-weight'], {duration: 150}),
  margin: `0 ${theme.spacing(0.5)}`,
}));
