import {SpeechSynthesisUtteranceProps} from 'hooks/useSpeechSynthesis';

import {State} from 'store/currentWord/types';

import {CurrentWord} from 'models/Word';
import {WordVariant} from 'models/WordVariant';

export interface WordAndSentenceProps extends CurrentWord, Pick<State, 'currentWordTense' | 'wordVariants' | 'currentVariantIndex'> {}

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
