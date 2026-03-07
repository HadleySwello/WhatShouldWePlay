import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
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

const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState('system');
  const [reduceMovement, setReduceMovementState] = useState(false);
  const [largeText, setLargeTextState] = useState(false);

  useEffect(() => {
    getThemeMode().then(setThemeModeState);
    getReduceMovement().then(setReduceMovementState);
    getLargeText().then(setLargeTextState);
  }, []);

  const setThemeMode = useCallback((value) => {
    setThemeModeState(value);
    persistThemeMode(value);
  }, []);

  const setReduceMovement = useCallback((value) => {
    setReduceMovementState(value);
    persistReduceMovement(value);
  }, []);

  const setLargeText = useCallback((value) => {
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

export function useThemeMode() {
  const ctx = useContext(ThemeModeContext);
  if (!ctx) {
    throw new Error('useThemeMode must be used within ThemeModeProvider');
  }
  return ctx;
}
