import { createContext, ReactNode, useEffect, useState } from "react";

interface DarkModeContextProps {
  darkMode: boolean;
  toggle: () => void;
}

export const DarkModeContext = createContext<DarkModeContextProps | undefined>(
  undefined
);

interface DarkModeContextProviderProps {
  children: ReactNode;
}
 
export const DarkModeContextProvider: React.FC<DarkModeContextProviderProps> = ({
  children,
}) => {
  const storedDarkMode = localStorage.getItem("darkMode");
  const initialDarkMode = storedDarkMode ? JSON.parse(storedDarkMode) : true;

  const [darkMode, setDarkMode] = useState<boolean>(initialDarkMode);

  const toggle = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggle }}>
      {children}
    </DarkModeContext.Provider>
  );
};
