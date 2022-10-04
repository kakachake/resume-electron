import { createContext, FC, useEffect, useState } from 'react';

export enum themeType {
  light = 'light',
  dark = 'dark',
}

interface ThemeContextProps {
  theme: themeType;
  setTheme: (theme: themeType) => void;
}

export const ThemeContext = createContext<ThemeContextProps>({} as ThemeContextProps);

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

const ThemeContextProvider: FC<ThemeContextProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<themeType>(themeType.light);

  useEffect(() => {
    const theme = localStorage.getItem('theme') as themeType;
    if (theme in themeType) {
      setTheme(theme);
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.setAttribute('theme-mode', theme);
  }, [theme]);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
