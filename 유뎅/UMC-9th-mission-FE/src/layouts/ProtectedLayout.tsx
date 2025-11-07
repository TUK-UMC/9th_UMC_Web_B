import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!accessToken) {
    return <Navigate to={"login"} replace />;
  }
  return (
    <div className="h-dvh flex flex-col ">
      <Navbar onMenuClick={() => setIsOpen((prev) => !prev)} />
      <div className="flex h-dvh">
        <Sidebar isOpen={isOpen} />
        <main className={`flex-1 mt-17 ${isOpen ? "ml-70" : "ml-0"}`}>
          <Outlet />
        </main>
      </div>
      <Footer />
      <button className="flex items-center justify-center fixed bottom-10 right-10 size-15 rounded-full bg-pink-500">
        <Plus color="white" size={30} />
      </button>
    </div>
  );
};
