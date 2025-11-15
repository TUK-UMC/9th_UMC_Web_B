import { Search, UserRoundIcon } from "lucide-react";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <aside
      className={`bg-white dark:bg-gray-950 fixed w-60 transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } h-[calc(100dvh-68px)] z-10 mt-17 overflow-hidden`}
    >
      <div className="flex flex-col justify-between h-full p-8">
        <div>
          <div className="flex gap-2 my-4">
            <Search color="white" />
            <p className="text-white">찾기</p>
          </div>
          <NavLink to={"/my"} className="flex gap-2 my-4">
            <UserRoundIcon color="white" />
            <p className="text-white">마이페이지</p>
          </NavLink>
        </div>
        <button className="text-white">탈퇴하기</button>
      </div>
    </aside>
  );
};
