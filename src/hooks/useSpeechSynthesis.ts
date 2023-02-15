import {useEffect, useState} from 'react';

type SpeechSynthesisUtteranceProps = Pick<
  SpeechSynthesisUtterance,
  'lang' | 'pitch' | 'rate' | 'text' | 'voice' | 'volume'
>;

interface UseSpeechSynthesisProps {
  onEnd?: () => void;
}

export const useSpeechSynthesis = ({onEnd}: UseSpeechSynthesisProps = {}) => {
  const [voices, setVoices] = useState([]);
  const [speaking, setSpeaking] = useState(false);
  const [supported, setSupported] = useState(false);

  const processVoices = (voiceOptions: any) => {
    setVoices(voiceOptions);
  };

  const getVoices = () => {
    // Firefox seems to have voices upfront and never calls the voiceschanged event
    let voiceOptions = window.speechSynthesis.getVoices();

    if (voiceOptions.length > 0) {
      processVoices(voiceOptions);
      return;
    }

    window.speechSynthesis.onvoiceschanged = (event: any) => {
      voiceOptions = event.target.getVoices();
      processVoices(voiceOptions);
    };
  };

  const handleEnd = () => {
    setSpeaking(false);
    if (onEnd) onEnd();
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
  }: Partial<SpeechSynthesisUtteranceProps> = {}) => {
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
    utterance.onend = handleEnd;

    window.speechSynthesis.speak(utterance);
  };

  const cancel = () => {
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
