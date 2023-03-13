import {Word} from 'models/Word';
import {SpeechSynthesisUtteranceProps} from 'hooks/useSpeechSynthesis';

export interface Props {
  currentWord: Word | undefined;
  speak: ({lang, pitch, rate, text, voice, volume}: SpeechSynthesisUtteranceProps) => void;
  voice: SpeechSynthesisVoice | undefined;
}

export interface ContextMenu {
  mouseX: number;
  mouseY: number;
}
