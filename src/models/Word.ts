export interface Word {
  readonly id: number;
  tenses: string[];
  sentences: string[];
}

export interface CurrentWord {
  currentWord: Word | undefined;
}

export interface TenseVariant {
  correct: boolean;
  variant: string;
}
