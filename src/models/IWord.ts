export interface IWord {
  readonly id: number;
  letter: string;
  tenses: string[];
  sentence: string;
}

export interface WordState {
  words: IWord[];
  isLoading: boolean;
  error: string;
}
