import {Speech} from 'hooks/useSpeechSynthesis';

import {State} from 'store/currentWord/types';

import {CurrentWord, TenseVariant} from 'models/Word';

export interface WordAndSentenceProps extends CurrentWord, Pick<State, 'tenseIndex' | 'tenseVariants' | 'tenseVariantIndex'> {}

interface SentenceAndTensesOfWord extends Pick<WordAndSentenceProps, 'currentWord'> {
  speech: Pick<Speech, 'isSpeaking' | 'speak' | 'cancelSpeaking'>;
  voice: SpeechSynthesisVoice | undefined;
}

export interface SentenceOfWordProps extends SentenceAndTensesOfWord {}

export interface ContextMenuPosition {
  top: number;
  left: number;
}

export interface SpreadOutWordProps extends Pick<State, 'tenseVariants' | 'tenseVariantIndex'> {}

export interface SpreadOutWordItemProps {
  item: TenseVariant;
}

export interface TensesOfWordProps extends SentenceAndTensesOfWord, Pick<State, 'tenseIndex'> {}

export interface TensesOfWordItemProps {
  tense: string;
  index: number;
  thisArg: string[];
  tenseIndex: number;
}
