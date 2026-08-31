import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react';
import {
  getThemeMode,
  setThemeMode as persistThemeMode,
} from '../helpers/themeStorage';
import {
  getReduceMovement,
  setReduceMovement as persistReduceMovement,
} from '../helpers/reduceMovementStorage';
import {
  getLargeText,
  setLargeText as persistLargeText,
} from '../helpers/largeTextStorage';

type ThemeMode = 'light' | 'dark' | 'system';

type ThemeContextValue = {
  themeMode: ThemeMode;
  setThemeMode: (value: ThemeMode) => void;
  reduceMovement: boolean;
  setReduceMovement: (value: boolean) => void;
  largeText: boolean;
  setLargeText: (value: boolean) => void;
};

const ThemeModeContext = createContext<ThemeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [reduceMovement, setReduceMovementState] = useState(false);
  const [largeText, setLargeTextState] = useState(false);

  useEffect(() => {
    getThemeMode().then(setThemeModeState);
    getReduceMovement().then(setReduceMovementState);
    getLargeText().then(setLargeTextState);
  }, []);

  const setThemeMode = useCallback((value: ThemeMode) => {
    setThemeModeState(value);
    persistThemeMode(value);
  }, []);

  const setReduceMovement = useCallback((value: boolean) => {
    setReduceMovementState(value);
    persistReduceMovement(value);
  }, []);

  const setLargeText = useCallback((value: boolean) => {
    setLargeTextState(value);
    persistLargeText(value);
  }, []);

  return (
    <ThemeModeContext.Provider
      value={{
        themeMode,
        setThemeMode,
        reduceMovement,
        setReduceMovement,
        largeText,
        setLargeText,
      }}
    >
      {children}
    </ThemeModeContext.Provider>
  );
}

export function useThemeMode(): ThemeContextValue {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return ctx;
}
