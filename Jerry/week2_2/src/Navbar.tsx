import clsx from 'clsx';
import { Theme, useTheme } from './context/ThemeProvider';
import ThemeToggleButton from './ThemeToggleButton';

// 네비게이션 바 (모드 변경 버튼 추가된)
export default function Navbar() {
  const { theme } = useTheme();

  const isLightMode = theme === Theme.LIGHT;

  return (
    <nav
      className={clsx(
        'p-4 w-full flex justify-end',
        isLightMode ? 'bg-white' : 'bg-gray-800'
      )}
    >
      <ThemeToggleButton />
    </nav>
  );
}
