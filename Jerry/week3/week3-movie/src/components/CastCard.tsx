import type { Person } from '../types/movie';

interface CastCardProps {
  person: Person;
}

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w200';

export const CastCard: React.FC<CastCardProps> = ({ person }) => (
  <div className="flex flex-col items-center text-center bg-gray-800 p-3 rounded-lg shadow-lg hover:bg-gray-700 transition-colors duration-200">
    <div className="w-20 h-20 rounded-full bg-gray-600 overflow-hidden mb-2">
      {person.profile_path ? (
        <img
          src={`${IMAGE_BASE_URL}/${person.profile_path}`}
          alt={person.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs">
          NO IMG
        </div>
      )}
    </div>
    <p className="text-sm font-semibold truncate w-full">{person.name}</p>
    <p className="text-xs text-gray-400 truncate w-full">
      {person.character || person.job}
    </p>
  </div>
);
