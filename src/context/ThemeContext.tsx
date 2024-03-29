import React, {createContext, useContext, useLayoutEffect, useMemo} from 'react';

import {PaletteMode} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';

import {useAppSelector} from 'hooks/redux';

import {State as StateReducerSettings} from 'store/settings/types';

type ThemeContextValue = PaletteMode;

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeContextValue | null>(null);

const getCurrentThemeColor = (themeMode: StateReducerSettings['themeMode'], prefersDarkMode: boolean) => {
  if (!themeMode || themeMode === 'system') {
    return prefersDarkMode ? 'light' : 'dark';
  } else {
    return themeMode;
  }
};

export const ThemeContextProvider = ({children}: ThemeContextProviderProps) => {
  const {themeMode} = useAppSelector((state) => state.settings);
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: light)');
  const themeColor = useMemo(() => getCurrentThemeColor(themeMode, prefersDarkMode), [themeMode, prefersDarkMode]);

  const memoizedContextValue = useMemo(() => themeColor, [themeColor]);

  useLayoutEffect(() => {
    const bodyElement = document.querySelector('body');

    if (!bodyElement) return;

    bodyElement.classList.remove('mode-dark', 'mode-light');
    bodyElement.classList.add(`mode-${themeColor}`);
  }, [themeColor]);

  return <ThemeContext.Provider value={memoizedContextValue} children={children} />;
};

export const useThemeContext = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) throw new Error('You need to use this context iside of provider');

  return themeContext;
};
