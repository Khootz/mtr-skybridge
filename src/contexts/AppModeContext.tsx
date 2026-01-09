import React, { createContext, useContext, useState, useEffect } from 'react';

export type AppMode = 'user' | 'enabler';

interface AppModeContextType {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
  toggleMode: () => void;
}

const AppModeContext = createContext<AppModeContextType | undefined>(undefined);

export const AppModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<AppMode>('user');

  useEffect(() => {
    if (mode === 'enabler') {
      document.documentElement.classList.add('enabler-mode');
    } else {
      document.documentElement.classList.remove('enabler-mode');
    }
  }, [mode]);

  const toggleMode = () => {
    setMode(prev => prev === 'user' ? 'enabler' : 'user');
  };

  return (
    <AppModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </AppModeContext.Provider>
  );
};

export const useAppMode = () => {
  const context = useContext(AppModeContext);
  if (!context) {
    throw new Error('useAppMode must be used within an AppModeProvider');
  }
  return context;
};
