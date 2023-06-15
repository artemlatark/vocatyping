import Box, {BoxProps} from '@mui/material/Box';
import CircularProgress, {CircularProgressProps} from '@mui/material/CircularProgress';
import {grey} from '@mui/material/colors';
import {styled} from '@mui/material/styles';
import Typography, {TypographyProps} from '@mui/material/Typography';

export const TimerForStudyCointainer = styled(Box)<BoxProps>({
  display: 'flex',
  alignItems: 'center',
});

export const GoalAchievedContainer = styled(Box)<BoxProps>({
  position: 'relative',
  display: 'inline-flex',
});

export const GoalAchievedProgressContainer = styled(Box)<BoxProps>({
  position: 'relative',
});

export const ProgressShell = styled(CircularProgress)<CircularProgressProps>(({theme}) => ({
  color: theme.palette.mode === 'light' ? grey[300] : grey[800],
}));

export const Progress = styled(CircularProgress)<CircularProgressProps>({
  position: 'absolute',
  left: 0,
});

export const GoalAchievedTextContainer = styled(Box)<BoxProps>({
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const GoalAchievedText = styled(Typography)<TypographyProps>({
  fontSize: 10,
  fontWeight: 600,
});
