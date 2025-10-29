import { ExperienceCard } from "../components/ExperienceCard";
import type { ExperienceCardProps } from "../components/ExperienceCard";
import Navbar from '../components/NavBar';
import {useState} from 'react'

const Home = () => {
  const experiences: ExperienceCardProps[] = [
    {
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format",
      title: "Kayaking",
      location: "Udupi",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 999,
    },
    {
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format",
      title: "Nandi Hills Sunrise",
      location: "Bangalore",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 899,
    },
    {
      image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format",
      title: "Coffee Trail",
      location: "Coorg",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 1299,
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format",
      title: "Nandi Hills Sunrise",
      location: "Bangalore",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 899,
    },
    {
      image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format",
      title: "Boat Cruise",
      location: "Sunderbar",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 999,
    },
    {
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format",
      title: "Bunjee Jumping",
      location: "Manali",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 999,
    },
    {
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format",
      title: "Coffee Trail",
      location: "Coorg",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 1299,
    },
    {
      image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format",
      title: "Kayaking",
      location: "Udupi, Karnataka",
      description: "Curated small-group experience. Certified guide. Safety first with gear included.",
      price: 999,
    },
  ];

  const [searchTerm, setSearchTerm] = useState('');
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
