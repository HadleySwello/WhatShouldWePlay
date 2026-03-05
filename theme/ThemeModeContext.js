import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getThemeMode, setThemeMode as persistThemeMode } from '../helpers/themeStorage';

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState('system');

  useEffect(() => {
    getThemeMode().then(setThemeModeState);
  }, []);

  const setThemeMode = useCallback((value) => {
    persistThemeMode(value).then(setThemeModeState);
  }, []);

  return (
    <ThemeModeContext.Provider value={{ themeMode, setThemeMode }}>
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return ctx;
}
