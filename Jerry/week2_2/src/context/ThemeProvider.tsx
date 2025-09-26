import { createContext, PropsWithChildren, useState, useContext } from 'react';

// Light Dark enum 설정
export enum Theme {
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

type TTheme = Theme.LIGHT | Theme.DARK;

interface IThemeContext {
  theme: TTheme;
  toggleTheme: () => void;
}

// createContext 이용하기
export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<TTheme>(Theme.LIGHT);

  const toggleTheme = (): void => {
    setTheme(
      (prev): Theme => (prev === Theme.LIGHT ? Theme.DARK : Theme.LIGHT)
    );
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// 코드 더 쉽게 쓰기 위해 값이 없을 경우 오류 생성시켜주는 함수
export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
