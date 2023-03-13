export interface CurrentWord {
  currentWord: Word | undefined;
}

export interface Word {
  readonly id: number;
  tenses: string[];
  sentence: string;
}
