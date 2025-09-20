import { useState } from "react";
import { Link } from 'react-router-dom';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
// https://unsplash.com/illustrations/here-is-a-simple-caption-an-orange-carrot-with-green-leaves-DdyFVPgB8iw
  return (
    <nav className="bg-[#fb6107] text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex justify-between items-center">
          <img class="w-10 h-10" src="src/img/carrot.png" alt="Carrot Logo"/>
          <h1 className="text-3xl font-bold px-5">Carrot</h1>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-gray-200">HOME</Link>
          <Link to="/about" className="hover:text-gray-200">ABOUT</Link>
          <Link to="/resources" className="hover:text-gray-200">RESOURCES</Link>
        </div>
      </div>
    </nav>
  );
}


export default Navbar;