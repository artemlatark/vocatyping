import {renderHook} from '@testing-library/react';
import {act} from 'react-dom/test-utils';

// eslint-disable-next-line jest/no-mocks-import
import MockSynthesis from '../../__mocks__/MockSynthesis';
// eslint-disable-next-line jest/no-mocks-import
import MockUtterance from '../../__mocks__/MockUtterance';
import {useSpeechSynthesis} from '../../useSpeechSynthesis';

describe('useSpeechSynthesis custom hook', () => {
  jest.useFakeTimers();
  const mockOnEnd = jest.fn();

  beforeEach(() => {
    // @ts-ignore
    // noinspection JSConstantReassignment
    window.speechSynthesis = MockSynthesis;
    // @ts-ignore
    window.SpeechSynthesisUtterance = MockUtterance;
    MockSynthesis.reset();
    jest.clearAllTimers();
    jest.clearAllMocks();
  });

  describe('speechSynthesis is supported', () => {
    test('passes supported: true', () => {
      const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

      unmount();

      expect(result.current.isSupported).toBe(true);
    });
  });

  describe('speechSynthesis is unsupported', () => {
    beforeEach(() => {
      // @ts-ignore
      // noinspection JSConstantReassignment
      window.speechSynthesis = undefined;
    });

    test('passes supported: false', () => {
      const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

      unmount();

      expect(result.current.isSupported).toBe(false);
    });
  });

  test('is not speaking', () => {
    const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

    unmount();

    expect(result.current.isSpeaking).toBe(false);
  });

  describe('when window.speechSynthesis.getVoices returns voices async', () => {
    beforeEach(() => {
      MockSynthesis.getVoices = () => [];

      setTimeout(() => {
        MockSynthesis.getVoices = () => MockSynthesis.mockVoices;
        // @ts-ignore
        MockSynthesis.onvoiceschanged({target: MockSynthesis});
      }, 500);
    });

    test('passes voices: [] at first', () => {
      const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

      unmount();

      expect(result.current.voices).toEqual([]);
    });

    test('passes voices when they load', () => {
      act(() => {
        jest.advanceTimersByTime(500);
      });

      const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

      unmount();

      expect(result.current.voices).toEqual(MockSynthesis.mockVoices);
    });
  });

  describe('speak', () => {
    test('is speaking', () => {
      const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

      act(() => {
        result.current.speak();
      });

      unmount();

      expect(result.current.isSpeaking).toEqual(true);
    });
  });

  describe('cancel speaking', () => {
    test('is not speaking', () => {
      const {result, unmount} = renderHook(() => useSpeechSynthesis({onEnd: mockOnEnd}));

      act(() => {
        result.current.speak();
        result.current.cancelSpeaking();
      });

      unmount();

      expect(result.current.isSpeaking).toEqual(false);
    });
  });
});
