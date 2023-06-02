import {useEffect, useState} from 'react';

export type SpeechSynthesisUtterancePicked = Partial<Pick<SpeechSynthesisUtterance, 'lang' | 'pitch' | 'rate' | 'text' | 'voice' | 'volume'>>;

interface Props {
  onEnd?: () => void;
}

export interface Speech {
  voices: SpeechSynthesisVoice[];
  isSupported: boolean;
  isSpeaking: boolean;
  speak: (options: SpeechSynthesisUtterancePicked) => void;
  cancelSpeaking: () => void;
}

export const useSpeechSynthesis = ({onEnd}: Props = {}) => {
  const [voices, setVoices] = useState<Speech['voices']>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const getVoices = (): void => {
    // Firefox seems to have voices upfront and never calls the voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();

    if (voiceOptions.length > 0) {
      return setVoices(voiceOptions);
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      const target = event.target as SpeechSynthesis;
      voiceOptions = target.getVoices();
      setVoices(voiceOptions);
    };
  };

  const speak = ({lang = 'en', pitch = 1, rate = 1, text = '', voice = null, volume = 1}: SpeechSynthesisUtterancePicked = {}): void => {
    if (!isSupported) return;

    setIsSpeaking(true);

    // Firefox won't repeat an utterance that has been spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();

    utterance.lang = lang;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.text = text;
    utterance.voice = voice;
    utterance.volume = volume;
    utterance.onend = () => {
      setIsSpeaking(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancelSpeaking = (): void => {
    if (!isSupported) return;
    setIsSpeaking(false);
    window.speechSynthesis.cancel();
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setIsSupported(true);
    }
  }, []);

  useEffect(() => {
    if (isSupported) {
      getVoices();
    }
  }, [isSupported]);

  return {
    voices,
    isSupported,
    isSpeaking,
    speak,
    cancelSpeaking,
  };
};
