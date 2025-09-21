import { useState } from "react";

function HoverCard({ title, description, defaultImage, hoverImage, imageScale = "normal", onClick }) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Define different scales for different images (only for default icons)
  const getImageScale = () => {
    switch(imageScale) {
      case "small":
        return "max-w-[55%] max-h-[55%]"; // For recovery - even smaller
      case "large":
        return "max-w-[95%] max-h-[95%]"; // For quick - even larger
      default:
        return "max-w-[80%] max-h-[80%]"; // Normal size
    }
  };

  return (
    <div 
      className="bg-[#ffde5a] rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 h-auto min-h-[300px] flex flex-col cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {(defaultImage || hoverImage) && (
        <div className="h-40 overflow-hidden bg-white flex items-center justify-center p-4">
          <img 
            src={isHovered ? hoverImage : defaultImage} 
            alt={title} 
            className={
              isHovered 
                ? "w-full h-full object-cover transition-all duration-300" // Full coverage for salad images
                : `object-contain transition-all duration-300 ${getImageScale()}` // Scaled for icons
            }
          />
        </div>
      )}
      <div className="p-6 flex-1 flex flex-col justify-center text-center">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default HoverCard;
