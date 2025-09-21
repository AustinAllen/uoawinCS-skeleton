import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import About from './pages/About'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Builder from './pages/Builder'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/resources" element={<Profile />} />
        <Route path="/builder" element={<Builder />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
