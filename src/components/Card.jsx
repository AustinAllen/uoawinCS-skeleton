function Card({ title, description, image }) {
  return (
    <div className="bg-[#ffde5a] rounded-sm shadow-md overflow-hidden hover:shadow-lg transition h-100">
      {image && <img src={image} alt={title} className="w-full h-40 object-cover" />}
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <p className="text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default Card;
