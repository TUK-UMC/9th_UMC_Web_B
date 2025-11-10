import { useNavigate } from "react-router-dom";
import type { Lp } from "../../types/lp";
import { Heart } from "lucide-react";
import getRelativeTime from "../../utils/relativeTime";

interface LpCardProps {
  lp: Lp;
}

export const LpCard = ({ lp }: LpCardProps) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`lps/${lp.id}`)}
      className="relative rounded-sm overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer group"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div className="flex flex-col justify-end">
          <p className="inset-4 flex items-center text-white text-md font-semibold ">
            {lp.title}
          </p>
          <p className="inset-4 flex items-center text-white text-md">
            {getRelativeTime(lp?.updatedAt)}
          </p>
        </div>
        <div className="flex absolute items-center justify-center bottom-4 right-4">
          <Heart color="white" fill="white" size={15} />
          <p className="text-white ml-1">{lp.likes.length}</p>
        </div>
      </div>
    </div>
  );
};
