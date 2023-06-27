import React from 'react';

import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import {useAppSelector} from 'hooks/redux';

import {LoadingStatus} from 'models/LoadingStatus';

import SentencesOfWord from './components/SentencesOfWord';
import SpreadOutWord from './components/SpreadOutWord';
import TensesOfWord from './components/TensesOfWord';
import {WordAndSentenceConatiner} from './styles';

const WordAndSentence = () => {
  const {loading} = useAppSelector((state) => state.words);
  const {currentWord, tenseIndex, tenseVariants, tenseVariantIndex} = useAppSelector((state) => state.currentWord);

  return (
    <WordAndSentenceConatiner>
      {loading === LoadingStatus.succeeded ? (
        <>
          <TensesOfWord currentWord={currentWord} tenseIndex={tenseIndex} />
          <SentencesOfWord currentWord={currentWord} />
          <SpreadOutWord tenseVariants={tenseVariants} tenseVariantIndex={tenseVariantIndex} />
        </>
      ) : (
        <Grid alignItems="center" direction="column" container>
          <Skeleton variant="rounded" animation="wave" width={200} height={36} />
          <Skeleton variant="rounded" animation="wave" width={300} height={26} sx={{mt: 2}} />
          <Skeleton variant="rounded" animation="wave" width={50} height={40} sx={{mt: 4}} />
        </Grid>
      )}
    </WordAndSentenceConatiner>
  );
};

export default React.memo(WordAndSentence);
