import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

export enum THEME {
    LIGHT = 'LIGHT',
    DARK = 'DARK',
}

type Theme = THEME.LIGHT | THEME.DARK;

interface IThemeContext {
    theme : Theme;
    toggleTheme: () => void;
}

export const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    const [theme, setTheme] = useState<Theme>(THEME.LIGHT);
    const toggleTheme = () => {
        setTheme((prevTheme) =>
            prevTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
    };

    useEffect(() => {
        if (theme === THEME.DARK) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    }, [theme]);

    return (
        <ThemeContext.Provider
        value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = () => {
    const context = useContext(ThemeContext);

    if(!context) {
        throw new Error('useTodo를 사용하기 위해서는 무조건 ThemeProvider로 감싸야 합니다.')
    }
    return context;
}