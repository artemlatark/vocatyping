import {Word} from 'models/Word';

import {getIndexesSentences, getTenseIndex, makeTenseVariants, spreadSentencesByWords} from '../helpers';

describe('Store CurrentWord Helpers', () => {
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

  test('spreadSentencesByWords', () => {
    const currentWord = words[0];
    const expected = [{a: true, abandon: true, bad: true, boy: true, child: true, even: true, hes: true, id: true, if: true, my: true, never: true}];

    expect(spreadSentencesByWords(currentWord.sentences)).toEqual(expected);
  });
  test('getIndexesSentences', () => {
    const currentWord = words[1];
    const tenseIndex = getIndexesSentences(currentWord.tenses, spreadSentencesByWords(currentWord.sentences));
    const expected = [Infinity, 0];

    expect(tenseIndex).toEqual(expected);
  });
  test('getTenseIndex', () => {
    const currentWord = words[1];
    const tenseIndex = getTenseIndex(currentWord.tenses, spreadSentencesByWords(currentWord.sentences));
    const expected = 1;

    expect(tenseIndex).toEqual(expected);
  });
  test('makeTenseVariants', () => {
    const currentWord = words[1];
    const tenseIndex = makeTenseVariants(currentWord.tenses, 1);
    const expected = [
      {
        correct: false,
        variant: 'a',
      },
      {
        correct: false,
        variant: 'al',
      },
      {
        correct: false,
        variant: 'alt',
      },
      {
        correct: false,
        variant: 'alte',
      },
      {
        correct: false,
        variant: 'alter',
      },
      {
        correct: false,
        variant: 'altere',
      },
      {
        correct: false,
        variant: 'altered',
      },
    ];

    expect(tenseIndex).toEqual(expected);
  });
});
