import {Word} from 'models/Word';

import {getTenseIndex, makeTenseVariants, spreadSentencesByWords} from '../helpers';
import currentWordSlice, {initialState, initWord} from '../slice';

describe('currentWord reducers', () => {
  test('initWord', () => {
    const currentWord: Word = {
      id: 1,
      tenses: ['abandon'],
      sentences: ["i'd never abandon my child even if he's a bad boy"],
    };
    const tenseIndex = getTenseIndex(currentWord.tenses, spreadSentencesByWords(currentWord.sentences));
    const tenseVariants = makeTenseVariants(currentWord.tenses, tenseIndex);

    const expectedState = {
      ...initialState,
      currentWord,
      tenseIndex,
      tenseVariants,
    };

    expect(currentWordSlice(initialState, initWord(currentWord))).toEqual(expectedState);
  });
});
