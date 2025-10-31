import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export type ExperienceCardProps = {
  _id: string,
  image: string;
  title: string;
  location: string;
  description: string;
  price: number | string;
  badge?: string;
  variant?: 'default' | 'featured' | 'dark';
};

export const ExperienceCard: React.FC<ExperienceCardProps> = ({
  _id,
  image,
  title,
  location,
  description,
  price,
  badge,
  variant = 'default'
}) => {
  const variantStyles = {
    default: "bg-gray-100 border border-gray-200",
    featured: "bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200",
    dark: "bg-gray-800 border border-gray-700 text-white"
  };
  const badgeStyles = {
    default: "bg-gray-100 text-gray-800",
    featured: "bg-blue-100 text-blue-800",
    dark: "bg-gray-700 text-gray-300"
  };

  const [imgLoaded, setImgLoaded] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={`${variantStyles[variant]} rounded-xl shadow-sm hover:shadow-md transition-all duration-200 ease-in-out transform hover:-translate-y-1 max-w-sm mx-auto`}>
      <div className="relative w-full h-48 overflow-hidden rounded-t-xl bg-gray-200">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover filter blur-lg scale-105 transition-opacity duration-500 ${imgLoaded ? 'opacity-0' : 'opacity-100'}`}
          aria-hidden="true"
        />
        <img
          src={image}
          alt={title}
          loading="lazy"
          onLoad={() => setImgLoaded(true)}
          className={`relative w-full h-full object-cover transition-opacity duration-500 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className="p-4">
        {badge && <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-3 ${badgeStyles[variant]}`}>{badge}</span>}
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-xs text-black-600 bg-gray-300 px-2 py-1 rounded-md">
            {location}
          </p>
        </div>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex justify-between items-center mt-4">
          <div className="text-[12px] font-normal text-black">
            From <span className="text-[18px] font-bold tracking-tight text-black">₹{price}</span>
          </div>
          <button onClick={() => navigate(`/detail/${_id}`)} className="bg-yellow-400 text-black text-sm font-medium px-3 py-1.5 rounded-lg hover:bg-yellow-500 transition">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};
