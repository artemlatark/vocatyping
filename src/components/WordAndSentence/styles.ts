import {blueGrey, teal} from '@mui/material/colors';
import {styled} from '@mui/material/styles';

export const WordAndSentenceConatiner = styled('div')(({theme}) => ({
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  margin: `${theme.spacing(5)} auto 0`,
  textAlign: 'center',
}));

export const TensesOfWordContainer = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'light' ? blueGrey[800] : blueGrey[200],
  fontSize: 30,
  letterSpacing: 2,
}));

export const TenseVariantButton = styled('button')<{selected: boolean}>(({theme, selected}) => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: !selected ? 'inherit' : theme.palette.mode === 'light' ? blueGrey[900] : '#fff',
  fontSize: 'inherit',
  fontWeight: !selected ? 'inherit' : 600,
  letterSpacing: 'inherit',
  padding: 0,
}));

export const SentencesOfWordContainer = styled('div')(({theme}) => ({
  color: theme.palette.mode === 'light' ? blueGrey[600] : blueGrey[400],
  fontSize: 22,
  fontStyle: 'italic',
  marginTop: theme.spacing(2),
}));

export const WordVariant = styled('span')<{correct: boolean}>(({theme, correct}) => ({
  color: !correct ? (theme.palette.mode === 'light' ? blueGrey[800] : blueGrey[100]) : theme.palette.mode === 'light' ? teal[500] : teal['A400'],
  fontSize: !correct ? 34 : 24,
  fontWeight: !correct ? 'inherit' : 600,
  textAlign: 'left',
  transition: theme.transitions.create(['font-size', 'font-weight'], {duration: 150}),
  margin: `0 ${theme.spacing(0.5)}`,
}));
