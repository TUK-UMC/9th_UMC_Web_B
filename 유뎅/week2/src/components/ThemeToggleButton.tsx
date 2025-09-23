import { THEME, useTheme } from "../context/ThemeProvider";

const ThemeToggleButton = () => {
    const { theme, toggleTheme } = useTheme();

    const isLightMode = theme === THEME.LIGHT;

    return (
        <button onClick={toggleTheme}
            className="theme__button">
            {isLightMode ? '🌕라이트 모드' : '🌙다크 모드'}
        </button>
    );
}

export default ThemeToggleButton;