import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Search } from "lucide-react";

interface NavbarProps {
  onMenuClick?: () => void; // 🔹 사이드바 열기 함수 받기
}

export const Navbar: React.FC<NavbarProps> = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="bg-white dark:bg-gray-950 shadow-md fixed w-full z-20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <button onClick={onMenuClick}>
            <svg
              width="36"
              height="36"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
              className="text-white"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M7.95 11.95h32m-32 12h32m-32 12h32"
              />
            </svg>
          </button>
          <NavLink to="/" className="text-xl font-bold text-pink-500">
            돌려돌려 돌림판
          </NavLink>
        </div>
        <div className="flex space-x-6">
          <Search color="white" />
          {!accessToken && (
            <>
              <NavLink
                to="/login"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                로그인
              </NavLink>
              <NavLink
                to="/signup"
                className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
              >
                회원가입
              </NavLink>
            </>
          )}
          {accessToken && (
            <div className="flex gap-4">
              <NavLink to="/my" className="text-white">
                마이페이지
              </NavLink>
              <button className="text-white" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
