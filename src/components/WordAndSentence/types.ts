import {Word} from 'models/Word';
import {State} from 'store/currentWord/types';

export interface Props extends Pick<State, 'currentWordTense' | 'wordVariants' | 'currentVariantIndex'> {
  currentWord: Word | undefined;
}
