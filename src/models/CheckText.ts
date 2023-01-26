export interface WordVariant {
  correct: boolean;
  variant: string;
}

export interface CheckText {
  currentWordId: number;
  writtenText: string;
  currentWordTense: number;
  wordVariants: WordVariant[];
  currentVariantIndex: number;
}

export interface ChangeWordAction {
  handlerType: string;
  wordsNumbers: number;
}
