import {WordVariant} from '../../models/WordVariant';

export interface State {
  writtenText: string;
  currentWordId: number;
  currentWordTense: number;
  wordVariants: WordVariant[];
  currentVariantIndex: number;
}

export interface ChangeWordPayloadAction {
  handlerType?: string;
  wordId?: number;
  wordNumbers?: number;
}
