import { Theme, useTheme } from './context/ThemeProvider';
import clsx from 'clsx';

// 모드 변경 버튼
export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  const isLightMode = theme === Theme.LIGHT;

  return (
    <button
      onClick={toggleTheme}
      className={clsx('px-4 py-2 at-4 rounded-md transition-all', {
        'bg-black text-white': !isLightMode,
        'bg-white text-black border border-gray-500': isLightMode,
      })}
    >
      {isLightMode ? '🌙 다크 모드' : '☀️ 라이트 모드'}
    </button>
  );
}
