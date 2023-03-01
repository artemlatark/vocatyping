import {Word} from '../../models/Word';
import {State} from '../../store/currentWord/types';

export type Props = {
  currentWord: Word | undefined;
} & Pick<State, 'currentWordTense' | 'wordVariants' | 'currentVariantIndex'>;
