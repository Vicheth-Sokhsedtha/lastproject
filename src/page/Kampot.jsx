import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Added missing import

export default function Kampot() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("/kampot.json");
        setData(response.data);
      } catch (err) {
        setError(true);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    getData();
  }, []);

  if (loading) return <h1 className="text-center text-xl mt-10">Loading...</h1>;
  if (error) return <h1 className="text-center text-xl mt-10 text-red-500">Something went wrong!</h1>;

  return (
    <>
      <h1 className="p-5 text-3xl font-bold text-center mt-[100px]">Kampot Hotels</h1>

      {/* Grid container */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-5 max-w-7xl mx-auto">
        {data.map((hotel) => (
          <div
            key={hotel.id}
            className="bg-white shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition duration-300"
          >
            {/* Image */}
            <Link to={`/DetailKP/${hotel.id}`} className="block"> {/* Added block class */}
              <div className="w-full h-56">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{hotel.name}</h2>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2"> {/* Added line clamp */}
                  {hotel.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-green-600 font-bold">${hotel.price}/night</span>
                  <span className="text-yellow-500 font-medium">⭐ {hotel.rating}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
