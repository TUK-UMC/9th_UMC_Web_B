import type { Lp } from "../../types/lp";

interface LpCardProps {
  lp: Lp;
}

export const LpCard = ({ lp }: LpCardProps) => {
  return (
    <div
      key={lp.id}
      className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <img
        src={lp.thumbnail}
        alt={lp.title}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
