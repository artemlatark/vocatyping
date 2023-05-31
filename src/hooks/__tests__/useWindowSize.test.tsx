import {renderHook} from '@testing-library/react';

import {useWindowSize} from '../useWindowSize';

describe('useWindowSize custom hook', () => {
  test('check that the window size has been set to 500px', async () => {
    const windowSize = 500;
    global.innerWidth = windowSize;
    const {result, unmount} = renderHook(() => useWindowSize());

    jest.spyOn(window, 'removeEventListener');

    unmount();
    expect(window.removeEventListener).toHaveBeenCalledTimes(1);
    expect(result.current.width).toEqual(windowSize);
  });

  test('check that the window size has been change to 1000px', async () => {
    const initialWindowSize = 1024;
    const newWindowSize = 1000;

    global.innerWidth = initialWindowSize;

    const {result: result1024, unmount: unmount1024} = renderHook(() => useWindowSize());

    global.innerWidth = newWindowSize;

    const {result: result1000, unmount: unmount1000} = renderHook(() => useWindowSize());

    jest.spyOn(window, 'removeEventListener');

    unmount1024();
    unmount1000();

    expect(window.removeEventListener).toHaveBeenCalledTimes(2);
    expect(result1024.current.width).toEqual(initialWindowSize);
    expect(result1000.current.width).toEqual(newWindowSize);
  });
});
