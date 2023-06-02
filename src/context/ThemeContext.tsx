import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';

import {PaletteMode} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useAppSelector} from 'hooks/redux';

import {State as StateRreducerOptions} from 'store/options/types';

interface ThemeContextValue {
  themeColor: ThemeContextState;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeContextState>>;
}

type ThemeContextState = PaletteMode;

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const getCurrentThemeColor = (themeMode: StateRreducerOptions['themeMode'], prefersDarkMode: boolean) => {
  if (!themeMode || themeMode === 'system') {
    return prefersDarkMode ? 'light' : 'dark';
  } else {
    return themeMode;
  }
};

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const {themeMode} = useAppSelector((state) => state.optionsReducer);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const currentThemeColor = useMemo(() => getCurrentThemeColor(themeMode, prefersDarkMode), [themeMode, prefersDarkMode]);
  const [themeColor, setThemeColor] = useState<ThemeContextState>(currentThemeColor);

  const memoizedContextValue = useMemo(
    () => ({
      themeColor,
      setThemeColor,
    }),
    [themeColor, setThemeColor]
  );

  useEffect(() => {
    setThemeColor(currentThemeColor);
  }, [currentThemeColor]);

  return <ThemeContext.Provider value={memoizedContextValue} children={children} />;
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) throw new Error('You need to use this context iside of provider');

  return themeContext;
};
