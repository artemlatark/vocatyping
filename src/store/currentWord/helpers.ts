import {TenseVariant, Word} from 'models/Word';

import {SentenceByWords, State} from './types';

// Spreading sentences into object with words
export const spreadSentencesByWords = (sentences: Word['sentences']): SentenceByWords[] =>
  sentences.map((sentence) =>
    sentence
      // Convert to lowercase for case-insensitive search
      .toLowerCase()
      .replace(/[^a-zA-Z ]/g, '')
      .split(' ')
      .reduce(
        (previousValue: SentenceByWords, word) => ({
          ...previousValue,
          [word]: true,
        }),
        {}
      )
  );

// Array with indexes of sentences in which the first match of each tense was found
export const getTenseIndex = (tenses: Word['tenses'], sentencesByWords: SentenceByWords[]): number => {
  const indexesSentences = tenses.reduce((previousValue: number[], tense) => {
    // Convert to lowercase for case-insensitive search
    const tenseToLowerCase = tense.toLowerCase();
    const firstMatchIndex = sentencesByWords.findIndex((sentence) => sentence[tenseToLowerCase]);

    return !!~firstMatchIndex ? [...previousValue, firstMatchIndex] : [...previousValue, Infinity];
  }, []);
  const minIndexSentence = indexesSentences.indexOf(Math.min(...indexesSentences));

  return !!~minIndexSentence ? minIndexSentence : 0;
};

// Make tense variants from selected tense variant
export const makeTenseVariants = (tenses: Word['tenses'], tenseIndex: State['tenseIndex']): TenseVariant[] =>
  tenses[tenseIndex]
    // Convert to lowercase for case-insensitive search
    .toLowerCase()
    .split('')
    .map((letter: string, index: number, thisArg: string[]) => ({
      correct: false,
      variant: thisArg.slice(0, index + 1).join(''),
    }));
