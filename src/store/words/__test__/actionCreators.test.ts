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
    const fetchDictionaryResult = await mockedStore.dispatch(fetchDictionary({initialWordId: 0, dictionaryURL: 'sa213@#dw32D1'}));
    const expectedType = 'words/fetchDictionary/rejected';
    const expectedPayload = {
      name: 'FirebaseError',
      message: "Firebase Storage: Object 'sa213@#dw32D1' does not exist. (storage/object-not-found)",
    };

    expect(fetchDictionaryResult.type).toBe(expectedType);
    expect(fetchDictionaryResult.payload).toStrictEqual(expectedPayload);
  });
});
