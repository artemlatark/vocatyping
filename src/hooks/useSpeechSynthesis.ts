import {useCallback, useEffect, useState} from 'react';

export type SpeechSynthesisUtterancePicked = Partial<Pick<SpeechSynthesisUtterance, 'lang' | 'pitch' | 'rate' | 'text' | 'voice' | 'volume'>>;

interface Props {
  favoriteLanguages?: string[];
  onEnd?: () => void;
}

export interface Speech {
  voices: SpeechSynthesisVoice[];
  isSupported: boolean;
  isSpeaking: boolean;
  speak: (options: SpeechSynthesisUtterancePicked) => void;
  cancelSpeaking: () => void;
}

const filterVoicesByLang = (voices: Speech['voices'], favoriteLanguages: Props['favoriteLanguages']) => {
  if (!favoriteLanguages) return voices;

  return voices.filter((voice) => favoriteLanguages.includes(voice.lang));
};

export const useSpeechSynthesis = ({favoriteLanguages, onEnd}: Props = {favoriteLanguages: []}) => {
  const [voices, setVoices] = useState<Speech['voices']>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);

  const getVoices = useCallback((): void => {
    // Firefox seems to have voices upfront and never calls the voiceschanged event
    let voiceOptions = filterVoicesByLang(window.speechSynthesis.getVoices(), favoriteLanguages);

    if (voiceOptions.length > 0) {
      return setVoices(voiceOptions);
    }

    window.speechSynthesis.onvoiceschanged = (event) => {
      const target = event.target as SpeechSynthesis;
      voiceOptions = filterVoicesByLang(target.getVoices(), favoriteLanguages);
      setVoices(voiceOptions);
    };
  }, [favoriteLanguages]);

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
  }, [isSupported, getVoices]);

  return {
    voices,
    isSupported,
    isSpeaking,
    speak,
    cancelSpeaking,
  };
};
