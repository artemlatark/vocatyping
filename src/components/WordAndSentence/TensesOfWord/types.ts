import {Word} from 'models/Word';
import {State} from 'store/currentWord/types';
import {SpeechSynthesisUtteranceProps} from '../../../hooks/useSpeechSynthesis';

export interface Props extends Pick<State, 'currentWordTense'> {
  currentWord: Word | undefined;
  speak: ({lang, pitch, rate, text, voice, volume}: SpeechSynthesisUtteranceProps) => void;
  voice: SpeechSynthesisVoice | undefined;
}
