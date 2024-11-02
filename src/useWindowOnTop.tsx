import { createContext, useContext, useState } from 'react';

interface AppContextType {
  windowOnTop: string | undefined;
  setWindowOnTop: (value: string | undefined) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const WindowOnTopProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [windowOnTop, setWindowOnTop] = useState<string | undefined>(undefined);

  return (
    <AppContext.Provider value={{ windowOnTop, setWindowOnTop }}>
      {children}
    </AppContext.Provider>
  );
};

export const useWindowOnTop = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useWindowOnTop must be used within a WindowOnTopProvider');
  }
  return context;
};
