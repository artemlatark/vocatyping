import {fireEvent, renderHook} from '@testing-library/react';

import {useKeyPress} from '../useKeyPress';

describe('useKeyPress custom hook', () => {
  test('Alt key is down', async () => {
    const {result, unmount} = renderHook(() => useKeyPress('Alt'));

    fireEvent.keyDown(window, {key: 'Alt', code: 'AltLeft'});

    unmount();

    expect(result.current).toEqual(true);
  });
  test('Alt key is up', async () => {
    const {result, unmount} = renderHook(() => useKeyPress('Alt'));

    fireEvent.keyUp(window, {key: 'Alt', code: 'AltLeft'});

    unmount();

    expect(result.current).toEqual(false);
  });
  test('Some key is down', async () => {
    const {result, unmount} = renderHook(() => useKeyPress('q'));

    fireEvent.keyUp(window, {key: 'q', code: 'KeyQ'});

    unmount();

    expect(result.current).toEqual(false);
  });
});
