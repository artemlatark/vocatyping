import React, {createContext, useContext, useMemo} from 'react';

import {favoriteLanguages} from 'config/settings';

import {useAppSelector} from 'hooks/redux';
import {Speech, useSpeechSynthesis} from 'hooks/useSpeechSynthesis';

interface SpeechSynthesisContextValue {
  speechSynthesis: Speech;
  selectedVoice: SelectedVoice;
}

export type SelectedVoice = SpeechSynthesisVoice | null;

interface SpeechSynthesisContextProviderProps {
  children: React.ReactNode;
}

export const SpeechSynthesisContext = createContext<SpeechSynthesisContextValue | null>(null);

export const SpeechSynthesisContextProvider = ({children}: SpeechSynthesisContextProviderProps) => {
  const {voiceURI} = useAppSelector((state) => state.settings);
  const speechSynthesis = useSpeechSynthesis({favoriteLanguages});
  const selectedVoice = useMemo(() => {
    return speechSynthesis.voices.find((voice) => voice.name === voiceURI) ?? speechSynthesis.voices[0] ?? null;
  }, [speechSynthesis.voices, voiceURI]);

  const memoizedContextValue = useMemo(
    () => ({
      speechSynthesis,
      selectedVoice,
    }),
    [selectedVoice, speechSynthesis]
  );

  return <SpeechSynthesisContext.Provider value={memoizedContextValue} children={children} />;
};

export const useSpeechSynthesisContext = () => {
  const speechSynthesisContext = useContext(SpeechSynthesisContext);

  if (!speechSynthesisContext) throw new Error('You need to use this context iside of provider');

  return speechSynthesisContext;
};
