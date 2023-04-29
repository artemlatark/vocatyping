import {Speech} from 'hooks/useSpeechSynthesis';

import {State} from 'store/currentWord/types';

import {CurrentWord} from 'models/Word';

import {Props as TypeFormProps} from 'components/TypeForm/types';

export interface WordAndSentenceProps extends Pick<TensesOfWordProps, 'typeFormInputRef'> {}

export interface SentenceOfWordProps extends SentenceAndTensesOfWord {}

export interface SpreadOutWordProps extends Pick<State, 'tenseVariants' | 'tenseVariantIndex'> {}

export interface TensesOfWordProps extends SentenceAndTensesOfWord, Pick<State, 'tenseIndex'> {
  typeFormInputRef: TypeFormProps['typeFormInputRef'];
}

interface SentenceAndTensesOfWord {
  currentWord: CurrentWord['currentWord'];
  speech: Pick<Speech, 'isSpeaking' | 'speak' | 'cancelSpeaking'>;
  voice: SpeechSynthesisVoice | undefined;
}

export interface ContextMenuPosition {
  top: number;
  left: number;
}
