import React, {createContext, useContext, useMemo, useState} from 'react';

import {Speech} from 'hooks/useSpeechSynthesis';

export interface SpeechSynthesisContextValue {
  speechSynthesis: SpeechSynthesisContextState;
  setSpeechSynthesis: React.Dispatch<React.SetStateAction<SpeechSynthesisContextState>>;
}

export type SpeechSynthesisContextState = (Speech & {selectedVoice: SpeechSynthesisVoice}) | null;

interface SpeechSynthesisContextProviderProps {
  children: React.ReactNode;
}

export const SpeechSynthesisContext = createContext<SpeechSynthesisContextValue | null>(null);

export const SpeechSynthesisContextProvider = ({children}: SpeechSynthesisContextProviderProps) => {
  const [speechSynthesis, setSpeechSynthesis] = useState<SpeechSynthesisContextState>(null);

  const memoizedContextValue = useMemo(
    () => ({
      speechSynthesis,
      setSpeechSynthesis,
    }),
    [speechSynthesis, setSpeechSynthesis]
  );

  return <SpeechSynthesisContext.Provider value={memoizedContextValue} children={children} />;
};

export const useSpeechSynthesisContext = () => {
  const speechSynthesisContext = useContext(SpeechSynthesisContext);

  if (!speechSynthesisContext) throw new Error('You need to use this context iside of provider');

  return speechSynthesisContext;
};
