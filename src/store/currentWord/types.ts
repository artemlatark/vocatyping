import {TenseVariant} from 'models/Word';

export interface State {
  writtenText: string;
  currentWordId: string | undefined;
  tenseIndex: number;
  tenseVariants: TenseVariant[];
  tenseVariantIndex: number;
}
