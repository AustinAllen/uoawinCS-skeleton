import HoverCard from "../components/HoverCard";
import { useState } from "react";

// Import images
import searchBarBG from "../img/SearchBarBG.jpeg";
import carrotIcon from "../img/carrot.png";

// Card images - matching themes
import quickImg from "../img/Quick.jpg";
import budgetImg from "../img/budget.jpg";
import hydratingImg from "../img/hydration.jpg";
import recoveryImg from "../img/recovery.jpg";
import balancedImg from "../img/balanced.jpg";

// Original images for hover effect (keeping the salad images)
import focusSalad from "../img/Focus_Salad.jpg";
import proteinSalad from "../img/Muscle_Salad.jpg";
import veganSalad from "../img/Vegan_Salad.webp";
import nutfreeSalad from "../img/NutsFree_Salad.jpg";
import leanSalad from "../img/WeightControl_Salad.webp";

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Background Image */}
      <section className="relative h-[500px] bg-cover bg-center flex items-center justify-center" 
               style={{
                 backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${searchBarBG})`,
               }}>
        <div className="text-center text-white max-w-5xl px-6 w-full">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg text-shadow">
            Salad Tracker
          </h1>
          <p className="text-2xl mb-12 drop-shadow-md font-light">
            Build salads and track your health and wellbeing!
          </p>
          
          {/* Search Box */}
          <div className="flex max-w-3xl mx-auto drop-shadow-lg">
            <input
              type="text"
              placeholder="Tell us what you're looking for..."
              className="flex-1 px-8 py-5 rounded-l-lg text-gray-100 placeholder-gray-400 bg-gray-800 bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#fbb02d] text-xl border-0"
            />
            <button className="bg-[#fbb02d] hover:bg-[#e09a1a] text-gray-800 px-10 py-5 rounded-r-lg transition duration-300 text-xl font-semibold shadow-lg flex items-center gap-3">
              <span>Search</span>
              <img src={carrotIcon} alt="carrot" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Suggestion Section */}
      <section className="bg-[#fcf8d4] py-12">
        <div className="container mx-auto text-center px-6">
          <p className="text-2xl text-gray-700 mb-8 font-medium">
            If you're not sure yet, how about...
          </p>
        </div>
      </section>

      {/* Cards Section */}
      <section className="bg-[#fcf8d4] pb-16">
        <div className="container mx-auto px-6">
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-5 max-w-7xl mx-auto">
            <HoverCard
              title="Quick"
              description="5-min, ready-to-eat only"
              defaultImage={quickImg}
              hoverImage={focusSalad}
              imageScale="large"
            />
            <HoverCard
              title="Budget"
              description="more protein per dollar"
              defaultImage={budgetImg}
              hoverImage={proteinSalad}
            />
            <HoverCard
              title="Hydrating"
              description="cooling, high-water veggies"
              defaultImage={hydratingImg}
              hoverImage={veganSalad}
            />
            <HoverCard
              title="Recovery"
              description="protein + carbs balance"
              defaultImage={recoveryImg}
              hoverImage={nutfreeSalad}
              imageScale="small"
            />
            <HoverCard
              title="Balanced"
              description="all macros in range"
              defaultImage={balancedImg}
              hoverImage={leanSalad}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;