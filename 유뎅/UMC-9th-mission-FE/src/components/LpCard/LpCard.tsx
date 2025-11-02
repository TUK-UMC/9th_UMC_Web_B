import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

export const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div
      key={lp.id}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-48 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
        <div className="flex items-center text-white text-md font-semibold ">
          {lp.title}
        </div>
        <div className="flex items-end justify-end text-white text-sm font-semibold ">
          ♥{lp.likes.length}
        </div>
      </div>
    </div>
  );
};
