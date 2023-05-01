import {Speech} from 'hooks/useSpeechSynthesis';

import {State as CurrentWordState} from 'store/currentWord/types';

import {CurrentWord} from 'models/Word';

export interface SentenceOfWordProps extends SentenceAndTensesOfWord {}

export interface SpreadOutWordProps extends Pick<CurrentWordState, 'tenseVariants' | 'tenseVariantIndex'> {}

export interface TensesOfWordProps extends SentenceAndTensesOfWord, Pick<CurrentWordState, 'tenseIndex'> {}

interface SentenceAndTensesOfWord {
  currentWord: CurrentWord['currentWord'];
  speech: Pick<Speech, 'isSpeaking' | 'speak' | 'cancelSpeaking'>;
  voice: SpeechSynthesisVoice | undefined;
}

export interface ContextMenuPosition {
  top: number;
  left: number;
}
