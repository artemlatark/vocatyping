import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';

const TimerForStudy = () => {
  return (
    <Box sx={{display: 'flex', alignItems: 'center'}}>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(0)} min`}</Typography>
      </Box>
      <Box sx={{width: 100, mr: 1, ml: 1}}>
        <LinearProgress variant="determinate" value={30} />
      </Box>
      <Box>
        <Typography variant="body2" color="text.secondary">{`${Math.round(30)} min`}</Typography>
      </Box>
    </Box>
  );
};

export default TimerForStudy;
