import React from 'react';

import Box from '@mui/material/Box';

import {WordVariant} from '../styles';
import {SpreadOutWordProps} from '../types';

const SpreadOutWord: React.FC<SpreadOutWordProps> = ({tenseVariants, tenseVariantIndex}) => (
  <Box sx={{minHeight: 40, mt: 4, wordBreak: 'break-word'}}>
    {tenseVariants.map(
      (item, index) =>
        tenseVariantIndex >= index && (
          <WordVariant key={item.variant} correct={item.correct}>
            {item.variant}
          </WordVariant>
        )
    )}
  </Box>
);

export default React.memo(SpreadOutWord);
