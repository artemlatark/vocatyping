import {Word} from 'models/Word';
import {WordVariant} from 'models/WordVariant';
import {State} from 'store/currentWord/types';
import {SpeechSynthesisUtteranceProps} from 'hooks/useSpeechSynthesis';

export interface WordAndSentenceProps extends Pick<State, 'currentWordTense' | 'wordVariants' | 'currentVariantIndex'> {
  currentWord: Word | undefined;
}

export interface SentenceOfWordProps extends Pick<WordAndSentenceProps, 'currentWord'> {
  speak: ({lang, pitch, rate, text, voice, volume}: SpeechSynthesisUtteranceProps) => void;
  voice: SpeechSynthesisVoice | undefined;
}

export interface ContextMenu {
  mouseX: number;
  mouseY: number;
}

export interface SpreadOutWordProps extends Pick<State, 'wordVariants' | 'currentVariantIndex'> {}

export interface SpreadOutWordItemProps {
  item: WordVariant;
}

export interface TensesOfWordProps extends SentenceOfWordProps, Pick<State, 'currentWordTense'> {}

export interface TensesOfWordItemProps {
  tense: string;
  index: number;
  thisArg: string[];
  currentWordTense: number;
}
