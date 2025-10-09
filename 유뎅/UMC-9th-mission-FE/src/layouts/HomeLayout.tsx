import { NavLink, Outlet } from "react-router-dom";

export const HomeLayout = () => {
  return (
    <div className="h-dvh flex flex-col">
      <NavLink to="/">홈</NavLink>
      <NavLink to="/login">로그인</NavLink>
      <NavLink to="/signup">회원가입</NavLink>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer>푸터</footer>
    </div>
  );
};