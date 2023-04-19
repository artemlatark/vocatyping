export interface Word {
  readonly id: string;
  word: string;
  tenses: string[];
  sentences: string[];
  createdAt: string;
}

export interface CurrentWord {
  currentWord: Word | undefined;
}

export interface TenseVariant {
  correct: boolean;
  variant: string;
}
