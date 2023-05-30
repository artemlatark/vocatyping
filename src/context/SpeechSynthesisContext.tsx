import React, {createContext, useContext, useMemo, useState} from 'react';

import {Speech} from 'hooks/useSpeechSynthesis';

export type SpeechSynthesisContextType = {
  speechSynthesisCtx: SpeechSynthesisContextState;
  setSpeechSynthesisCtx: React.Dispatch<React.SetStateAction<SpeechSynthesisContextState>>;
};

export type SpeechSynthesisContextState = (Speech & {selectedVoice: SpeechSynthesisVoice | undefined}) | null;

interface SpeechSynthesisContextProviderProps {
  children: React.ReactNode;
}

export const SpeechSynthesisContext = createContext<SpeechSynthesisContextType | null>(null);

export const SpeechSynthesisContextProvider = ({children}: SpeechSynthesisContextProviderProps) => {
  const [speechSynthesisCtx, setSpeechSynthesisCtx] = useState<SpeechSynthesisContextState>(null);

  const memoizedContextValue = useMemo(
    () => ({
      speechSynthesisCtx,
      setSpeechSynthesisCtx,
    }),
    [speechSynthesisCtx, setSpeechSynthesisCtx]
  );

  return <SpeechSynthesisContext.Provider value={memoizedContextValue} children={children} />;
};

export const useSpeechSynthesisContext = () => {
  const speechSynthesisContext = useContext(SpeechSynthesisContext);

  if (!speechSynthesisContext) throw new Error('You need to use this context iside of provider');

  return speechSynthesisContext;
};
