import {useEffect, useState} from 'react';

export interface SpeechSynthesisUtteranceProps
  extends Partial<Pick<SpeechSynthesisUtterance, 'lang' | 'pitch' | 'rate' | 'text' | 'voice' | 'volume'>> {}

interface Props {
  onEnd?: () => void;
}

export const useSpeechSynthesis = ({onEnd}: Props = {}) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const getVoices = (): void => {
    // Firefox seems to have voices upfront and never calls the voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();

    if (voiceOptions.length > 0) {
      setVoices(voiceOptions);
      return;
    } else {
      setTimeout(() => getVoices(), 50);
    }

    window.speechSynthesis.onvoiceschanged = (event: any) => {
      voiceOptions = event.target.getVoices();
      setVoices(voiceOptions);
    };
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      setSupported(true);
      getVoices();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const speak = ({
    lang = 'en-US',
    pitch = 1,
    rate = 1,
    text = '',
    voice = null,
    volume = 1,
  }: SpeechSynthesisUtteranceProps = {}): void => {
    if (!supported) return;

    setSpeaking(true);

    // Firefox won't repeat an utterance that has been spoken, so we need to create a new instance each time
    const utterance = new window.SpeechSynthesisUtterance();

    utterance.lang = lang;
    utterance.pitch = pitch;
    utterance.rate = rate;
    utterance.text = text;
    utterance.voice = voice;
    utterance.volume = volume;
    utterance.onend = () => {
      setSpeaking(false);
      if (onEnd) onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const cancel = (): void => {
    if (!supported) return;
    setSpeaking(false);
    window.speechSynthesis.cancel();
  };

  return {
    supported,
    speak,
    speaking,
    cancel,
    voices,
  };
};
