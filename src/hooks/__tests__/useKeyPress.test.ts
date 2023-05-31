import {fireEvent, renderHook} from '@testing-library/react';

import {useKeyPress} from '../useKeyPress';

describe('useKeyPress custom hook', () => {
  test('Alt key is down', async () => {
    const {result, unmount} = renderHook(() => useKeyPress('Alt'));

    fireEvent.keyDown(document, {key: 'Alt', code: 'AltLeft'});
    jest.spyOn(document, 'removeEventListener');

    unmount();
    // we have 2 listeners, then we need check 2 called times
    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(true);
  });
  test('Alt key is up', async () => {
    const {result, unmount} = renderHook(() => useKeyPress('Alt'));

    fireEvent.keyDown(document, {key: 'Alt', code: 'AltLeft'});
    fireEvent.keyUp(document, {key: 'Alt', code: 'AltLeft'});
    jest.spyOn(document, 'removeEventListener');

    unmount();

    // we have 2 listeners, then we need check 2 called times
    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(false);
  });
  test('Some key is down', async () => {
    const {result, unmount} = renderHook(() => useKeyPress('q'));

    fireEvent.keyDown(document, {key: 'r', code: 'KeyR'});
    jest.spyOn(document, 'removeEventListener');

    unmount();

    // we have 2 listeners, then we need check 2 called times
    expect(document.removeEventListener).toHaveBeenCalledTimes(2);
    expect(result.current).toEqual(false);
  });
});
