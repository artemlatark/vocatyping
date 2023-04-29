import {CurrentWord, TenseVariant} from 'models/Word';

export interface State {
  writtenText: string;
  currentWord: CurrentWord['currentWord'];
  currentWordId: number;
  currentWordIndex: number;
  tenseIndex: number;
  tenseVariants: TenseVariant[];
  tenseVariantIndex: number;
  isTenseVariantCorrectlyTyped: boolean;
}

export interface SentenceByWords {
  [key: string]: boolean;
}
