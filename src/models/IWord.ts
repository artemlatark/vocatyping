export interface IWord {
  readonly id: number;
  tenses: string[];
  sentence: string;
}

export interface WordState {
  words: IWord[];
  isLoading: boolean;
  error: string;
}
