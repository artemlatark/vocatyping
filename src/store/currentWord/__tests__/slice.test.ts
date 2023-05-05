import {Word} from 'models/Word';

import {makeTenseVariants} from '../helpers';
import currentWordSlice, {changeTense, changeWord, checkTenseVariant, initialState, initWord, writeText} from '../slice';

describe('Store CurrentWord Slice Reduces', () => {
  const words: Word[] = [
    {
      id: 1,
      tenses: ['abandon'],
      sentences: ["i'd never abandon my child even if he's a bad boy"],
    },
    {
      id: 89,
      tenses: ['alter', 'altered'],
      sentences: ['That dress got altered by the best tailor in town.'],
    },
  ];

  test('initWord', () => {
    const currentWord = words[1];
    const expected = {
      ...initialState,
      currentWord: currentWord,
      tenseIndex: 1,
      tenseVariants: makeTenseVariants(currentWord.tenses, 1),
    };

    expect(currentWordSlice(initialState, initWord(currentWord))).toEqual(expected);
  });

  test('writeText', () => {
    const expected = {
      ...initialState,
      writtenText: 'test',
    };

    expect(currentWordSlice(initialState, writeText('test'))).toEqual(expected);
  });

  describe('checkTenseVariant', () => {
    test('some variant is incorrect', () => {
      const currentWord = words[1];
      const tenseVariants = makeTenseVariants(currentWord.tenses, 1);
      tenseVariants[0].correct = true;
      tenseVariants[1].correct = true;
      const newInitialState = {
        ...initialState,
        currentWord: currentWord,
        tenseIndex: 1,
        tenseVariants,
        tenseVariantIndex: 2,
      };
      const expected = {
        ...newInitialState,
        tenseVariants,
      };
      expected.tenseVariants[2].correct = false;

      expect(currentWordSlice(newInitialState, checkTenseVariant('alo'))).toEqual(expected);
    });

    test('some variant is correct', () => {
      const currentWord = words[1];
      const tenseVariants = makeTenseVariants(currentWord.tenses, 1);
      tenseVariants[0].correct = true;
      tenseVariants[1].correct = true;
      const newInitialState = {
        ...initialState,
        writtenText: 'alt',
        currentWord: currentWord,
        tenseIndex: 1,
        tenseVariants,
        tenseVariantIndex: 2,
      };
      const expected = {
        ...newInitialState,
        writtenText: '',
        tenseVariants,
        tenseVariantIndex: 3,
      };
      expected.tenseVariants[2].correct = true;

      expect(currentWordSlice(newInitialState, checkTenseVariant('alt'))).toEqual(expected);
    });

    test('all variants is correct', () => {
      const currentWord = words[1];
      const newInitialState = {
        ...initialState,
        currentWord: currentWord,
        tenseIndex: 1,
        tenseVariants: makeTenseVariants(currentWord.tenses, 1),
        tenseVariantIndex: 6,
      };
      newInitialState.tenseVariants.map((tenseVariant) => (tenseVariant.correct = true));
      let expected = {
        ...newInitialState,
        isTenseVariantCorrectlyTyped: true,
      };

      expect(currentWordSlice(newInitialState, checkTenseVariant('altered'))).toEqual(expected);
    });
  });

  test('changeTense', () => {
    const currentWord = words[1];
    const newInitialState = {
      ...initialState,
      currentWord,
    };
    const expected = {
      ...newInitialState,
      tenseIndex: 0,
      tenseVariants: makeTenseVariants(currentWord.tenses, 0),
    };

    expect(currentWordSlice(newInitialState, changeTense(0))).toEqual(expected);
  });

  test('changeWord', () => {
    const expected = {
      ...initialState,
      currentWordId: 89,
      currentWordIndex: 88,
    };

    expect(currentWordSlice(initialState, changeWord(89))).toEqual(expected);
  });
});
