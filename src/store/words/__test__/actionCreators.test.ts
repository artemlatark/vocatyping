import {setupStore} from 'store/store';

import {fetchDictionary} from '../actionCreators';

const mockedStore = setupStore();

describe('Store Words Slice Action Creators', () => {
  test('fetchDictionary fulfilled', async () => {
    const fetchDictionaryResult = await mockedStore.dispatch(fetchDictionary({initialWordId: 0}));
    const expectedType = 'words/fetchDictionary/fulfilled';

    expect(fetchDictionaryResult.type).toBe(expectedType);
  });

  test('fetchDictionary rejected', async () => {
    // @ts-ignore
    const fetchDictionaryResult = await mockedStore.dispatch(fetchDictionary({initialWordId: '123123'}));
    const expectedType = 'words/fetchDictionary/rejected';
    const expectedPayload = {
      name: 'TypeError',
      message: "Cannot read properties of undefined (reading 'sentences')",
    };

    expect(fetchDictionaryResult.type).toBe(expectedType);
    expect(fetchDictionaryResult.payload).toStrictEqual(expectedPayload);
  });
});
