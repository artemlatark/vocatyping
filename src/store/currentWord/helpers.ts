import {TenseVariant, Word} from 'models/Word';

import {State} from './types';

export const makeTenseVariants = (tenses: Word['tenses'], tenseIndex: State['tenseIndex']): TenseVariant[] =>
  tenses[tenseIndex]
    .toLowerCase()
    .split('')
    .map((letter: string, index: number, thisArg: string[]) => ({
      correct: false,
      variant: thisArg.slice(0, index + 1).join(''),
    }));
