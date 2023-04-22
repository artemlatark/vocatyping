import {SpeechSynthesisUtteranceProps} from 'hooks/useSpeechSynthesis';

import {State} from 'store/currentWord/types';

import {CurrentWord, TenseVariant} from 'models/Word';

export interface WordAndSentenceProps extends CurrentWord, Pick<State, 'tenseIndex' | 'tenseVariants' | 'tenseVariantIndex'> {}

export interface SentenceOfWordProps extends Pick<WordAndSentenceProps, 'currentWord'> {
  speak: ({lang, pitch, rate, text, voice, volume}: SpeechSynthesisUtteranceProps) => void;
  voice: SpeechSynthesisVoice | undefined;
}

export interface ContextMenu {
  mouseX: number;
  mouseY: number;
}

export interface SpreadOutWordProps extends Pick<State, 'tenseVariants' | 'tenseVariantIndex'> {}

export interface SpreadOutWordItemProps {
  item: TenseVariant;
}

export interface TensesOfWordProps extends SentenceOfWordProps, Pick<State, 'tenseIndex'> {}

export interface TensesOfWordItemProps {
  tense: string;
  index: number;
  thisArg: string[];
  tenseIndex: number;
}
