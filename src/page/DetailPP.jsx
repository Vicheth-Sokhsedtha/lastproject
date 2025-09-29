import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

export default function DetailPP() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    checkIn: "",
    checkOut: "",
    guests: "1"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        setLoading(true);
        const response = await fetch("/phnompenh.json");
        
        if (!response.ok) {
          throw new Error(`Failed to fetch hotel data: ${response.status}`);
        }
        
        const data = await response.json();
        const found = data.find((h) => h.id === id);
        
        if (!found) {
          setError("Hotel not found");
        } else {
          setHotel(found);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTotalPrice = () => {
    if (!formData.checkIn || !formData.checkOut || !hotel) return 0;
    
    const checkIn = new Date(formData.checkIn);
    const checkOut = new Date(formData.checkOut);
    const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
    
    return nights > 0 ? nights * hotel.price : 0;
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    
    // Check if user is logged in
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
      alert("Please sign in to book a hotel.");
      navigate('/signin');
      return;
    }

    setIsSubmitting(true);

    try {
      const totalPrice = calculateTotalPrice();
      const checkIn = new Date(formData.checkIn);
      const checkOut = new Date(formData.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));

      const booking = {
        id: Date.now(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        hotelImage: hotel.image,
        hotelPrice: hotel.price,
        userEmail: currentUser.email,
        fullName: formData.fullName || currentUser.name,
        email: formData.email || currentUser.email,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: parseInt(formData.guests),
        nights: nights,
        totalPrice: totalPrice,
        status: 'Confirmed',
        bookingDate: new Date().toISOString().split('T')[0]
      };

      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(booking);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));

      // Show success message
      alert(`Booking confirmed for ${hotel.name}! Total: $${totalPrice}`);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        checkIn: "",
        checkOut: "",
        guests: "1"
      });

      // Redirect to bookings page
      navigate('/booking');

    } catch (err) {
      alert("Error creating booking. Please try again.");
      console.error("Booking error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set default dates (tomorrow for check-in, day after for check-out)
  const getDefaultDate = (daysToAdd = 1) => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    return date.toISOString().split('T')[0];
  };

  // Auto-fill form with user data if logged in
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        fullName: currentUser.name || "",
        email: currentUser.email || ""
      }));
    }
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !hotel) {
    return (
      <div className="max-w-6xl mx-auto p-6 mt-20">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-500 mb-4">
            {error || "Hotel not found"}
          </h1>
          <Link 
            to="/phnompenh" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Hotels
          </Link>
        </div>
      </div>
    );
  }

  const totalPrice = calculateTotalPrice();
  const nights = totalPrice / hotel.price;

  return (
    <div className="max-w-6xl mx-auto p-6 mt-20">
      {/* Back button */}
      <div className="mb-6">
        <Link
          to="/phnompenh"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to Hotels
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Hotel Info & Gallery */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image gallery */}
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-4">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-64 md:h-80 object-cover rounded-xl col-span-2"
              />
              <div className="grid grid-rows-3 gap-2">
                {hotel.preview1 && (
                  <img 
                    src={hotel.preview1} 
                    alt={`${hotel.name} preview 1`} 
                    className="w-full h-24 md:h-32 object-cover rounded-xl" 
                  />
                )}
                {hotel.preview2 && (
                  <img 
                    src={hotel.preview2} 
                    alt={`${hotel.name} preview 2`} 
                    className="w-full h-24 md:h-32 object-cover rounded-xl" 
                  />
                )}
                {hotel.preview3 && (
                  <img 
                    src={hotel.preview3} 
                    alt={`${hotel.name} preview 3`} 
                    className="w-full h-24 md:h-32 object-cover rounded-xl" 
                  />
                )}
              </div>
            </div>
          </div>

          {/* Hotel Info */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-800">{hotel.name}</h1>
              <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                {hotel.title}
              </span>
            </div>
            
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl font-semibold text-green-600">
                ${hotel.price}/night
              </span>
              <span className="flex items-center text-yellow-500 font-medium">
                ⭐ {hotel.rating}
              </span>
            </div>

            <p className="text-gray-600 leading-relaxed">{hotel.description}</p>

            {/* Features */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Free WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Swimming Pool</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Air Conditioning</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Breakfast Included</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>24/7 Front Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-500">✓</span>
                <span>Parking Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <h2 className="text-xl font-semibold mb-6 text-center">Book Your Stay</h2>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-in
                  </label>
                  <input 
                    type="date" 
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleInputChange}
                    min={getDefaultDate()}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Check-out
                  </label>
                  <input 
                    type="date" 
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleInputChange}
                    min={formData.checkIn || getDefaultDate(2)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent" 
                    required 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Guests
                </label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  {[1, 2, 3, 4, 5, 6].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Summary */}  
              {totalPrice > 0 && (
                <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>${hotel.price} × {nights} nights</span>
                    <span>${hotel.price * nights}</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Total</span>
                    <span className="text-green-600">${totalPrice}</span>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 rounded-lg font-semibold transition ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-4 text-center text-xs text-gray-500">
              🔒 Your booking is secure and encrypted
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}