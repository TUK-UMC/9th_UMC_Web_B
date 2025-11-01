import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { accessToken } = useAuth();

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md fixed w-full z-20">
      <div className="flex items-center justify-between p-4">
        <NavLink
          to="/"
          className="text-xl font-bold text-gray-900 dark:text-white"
        >
          돌려돌려 돌림판
        </NavLink>
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
