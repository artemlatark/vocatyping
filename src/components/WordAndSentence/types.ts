import {State as CurrentWordState} from 'store/currentWord/types';

import {CurrentWord} from 'models/Word';

export interface TensesOfWordProps extends Pick<CurrentWord, 'currentWord'>, Pick<CurrentWordState, 'tenseIndex'> {}

export interface SentenceOfWordProps extends Pick<CurrentWord, 'currentWord'> {}

export interface SpreadOutWordProps extends Pick<CurrentWordState, 'tenseVariants' | 'tenseVariantIndex'> {}

export interface ContextMenuPosition {
  top: number;
  left: number;
}
