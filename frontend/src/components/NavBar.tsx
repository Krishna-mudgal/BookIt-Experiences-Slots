import React, { useState } from 'react';
import logo from '../assets/logo.png';

type NavbarProps = {
  onSearch: (term: string) => void;
};


const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {

  const [input, setInput] = useState("");

  return (
    <nav className="flex items-center justify-between px-20 py-4 bg-white shadow">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-8 w-auto mr-3" />
      </div>
      <form className="flex items-center space-x-2" onSubmit={(e) => {
        e.preventDefault();
        onSearch(input.trim());
      }}>
        <input
          type="text"
          placeholder="Search experiences"
          value={input}
          className="pl-6 pr-30 px-4 py-2 rounded-md focus:outline-none focus:ring focus:ring-yellow-200 text-sm bg-gray-100"
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 rounded-md text-black font-medium hover:bg-yellow-500 transition"
        >
          Search
        </button>
      </form>
    </nav>
  )

};

export default Navbar;
