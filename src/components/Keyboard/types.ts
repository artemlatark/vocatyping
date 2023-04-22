import {State} from 'store/currentWord/types';

export interface Props extends Pick<State, 'writtenText' | 'currentWordId' | 'tenseVariants' | 'tenseVariantIndex'> {}
