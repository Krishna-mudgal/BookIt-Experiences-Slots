import { ExperienceCard } from "../components/ExperienceCard";
import type { ExperienceCardProps } from "../components/ExperienceCard";
import Navbar from '../components/NavBar';
import { useEffect, useState } from 'react';

const Home = () => {
  const [experiences, setExperiences] = useState<ExperienceCardProps[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const backend = import.meta.env.VITE_BACKEND_URL;

  const getAllExperience = async (): Promise<ExperienceCardProps[]> => {
    try {
      const response = await fetch(`${backend}/experiences/`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.data as ExperienceCardProps[];
    } catch (error) {
      console.error("Failed to fetch experiences:", error);
      return [];
    }
  };

  useEffect(() => {
    (async () => {
      const exps = await getAllExperience();
      setExperiences(exps);
    })();
  }, []);

  const filtered = experiences.filter(exp =>
    exp.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar onSearch={setSearchTerm} />
      <div className="container mx-auto py-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((exp, idx) => (
            <ExperienceCard key={idx} {...exp} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
