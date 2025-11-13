import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { CreateLpModal } from "../components/CreateLpModal";
import { useSidebar } from "../hooks/useSidebar";

export const ProtectedLayout = () => {
  const { accessToken } = useAuth();
  const { isOpen, toggle, open, close } = useSidebar();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        close();
      } else {
        open();
      }
    };
    handleResize(); // 초기 실행
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  });

  if (!accessToken) {
    return <Navigate to={"login"} replace />;
  }
  return (
    <div className="min-h-screen flex flex-col ">
      <Navbar onMenuClick={toggle} />
      <div className="flex flex-1">
        <Sidebar isOpen={isOpen} onClose={close} />
        <main
          className={`flex-1 mt-17 ${isOpen ? "ml-60" : "ml-0"}`}
          onClick={close}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
      <button
        onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center fixed bottom-10 right-10 size-15 rounded-full bg-pink-500"
      >
        <Plus color="white" size={30} />
      </button>
      {isModalOpen && <CreateLpModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
};
