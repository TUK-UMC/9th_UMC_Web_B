import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { accessToken } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-20">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
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
          <NavLink
            to="/"
            className="text-xl font-bold text-gray-900 dark:text-white"
          >
            돌려돌려 돌림판
          </NavLink>
        </div>
        <div className="space-x-6">
          <NavLink
            to="/search"
            className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
          >
            검색
          </NavLink>
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
            <NavLink
              to="/my"
              className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
            >
              마이페이지
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
