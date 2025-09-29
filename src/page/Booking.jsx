import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Booking() {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [userBookings, setUserBookings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      navigate('/signin');
      return;
    }

    // Get user's bookings from localStorage
    const userEmail = JSON.parse(currentUser).email;
    const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
    const userSpecificBookings = allBookings.filter(booking => 
      booking.userEmail === userEmail
    );
    
    setUserBookings(userSpecificBookings);
  }, [navigate]);

  const getBookingsByStatus = (status) => {
    const now = new Date().toISOString().split('T')[0];
    
    switch (status) {
      case 'upcoming':
        return userBookings.filter(booking => 
          booking.status === 'Confirmed' && booking.checkIn >= now
        );
      case 'past':
        return userBookings.filter(booking => 
          (booking.status === 'Completed' || (booking.status === 'Confirmed' && booking.checkOut < now))
        );
      case 'cancelled':
        return userBookings.filter(booking => booking.status === 'Cancelled');
      default:
        return [];
    }
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      // Update booking status in localStorage
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updatedBookings = allBookings.map(booking =>
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled', cancelDate: new Date().toISOString().split('T')[0] }
          : booking
      );
      
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      
      
      setUserBookings(userBookings.map(booking =>
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled', cancelDate: new Date().toISOString().split('T')[0] }
          : booking
      ));
      
      alert('Booking cancelled successfully!');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed': return 'bg-green-100 text-green-800';
      case 'Completed': return 'bg-blue-100 text-blue-800';
      case 'Cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const calculateNights = (checkIn, checkOut) => {
    const start = new Date(checkIn);
    const end = new Date(checkOut);
    return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  };

  const BookingCard = ({ booking }) => (
    <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
      <div className="flex flex-col md:flex-row gap-6">
       
        <div className="md:w-48">
          <img
            src={booking.hotelImage || '/images/default-hotel.jpg'}
            alt={booking.hotelName}
            className="w-full h-32 md:h-full object-cover rounded-xl"
          />
        </div>

       
        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold">{booking.hotelName}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
              {booking.status}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <span className="block text-sm text-gray-600">Check-in</span>
              <span className="font-medium">{booking.checkIn}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Check-out</span>
              <span className="font-medium">{booking.checkOut}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Guests</span>
              <span className="font-medium">{booking.guests}</span>
            </div>
            <div>
              <span className="block text-sm text-gray-600">Total</span>
              <span className="font-semibold text-green-600">${booking.totalPrice}</span>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Booked on {booking.bookingDate} • {calculateNights(booking.checkIn, booking.checkOut)} night{calculateNights(booking.checkIn, booking.checkOut) > 1 ? 's' : ''}
              {booking.cancelDate && ` • Cancelled on ${booking.cancelDate}`}
            </div>
            
            <div className="flex gap-2">
              {booking.status === 'Confirmed' && (
                <button
                  onClick={() => cancelBooking(booking.id)}
                  className="text-red-600 hover:text-red-800 font-medium text-sm"
                >
                  Cancel
                </button>
              )}
              <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                View Details
              </button>
              {booking.status === 'Completed' && (
                <button className="text-green-600 hover:text-green-800 font-medium text-sm">
                  Book Again
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const upcomingBookings = getBookingsByStatus('upcoming');
  const pastBookings = getBookingsByStatus('past');
  const cancelledBookings = getBookingsByStatus('cancelled');

  return (
    <div className="max-w-6xl mx-auto p-6 mt-[100px]">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Bookings</h1>
        <p className="text-gray-600">Manage your upcoming and past reservations</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 mb-6">
        {[
          { key: 'upcoming', label: 'Upcoming', count: upcomingBookings.length },
          { key: 'past', label: 'Past', count: pastBookings.length },
          { key: 'cancelled', label: 'Cancelled', count: cancelledBookings.length }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center px-6 py-3 border-b-2 font-medium text-sm ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
              activeTab === tab.key
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-600'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Bookings List */}
      <div className="space-y-6">
        {getBookingsByStatus(activeTab).map((booking) => (
          <BookingCard key={booking.id} booking={booking} />
        ))}

        {getBookingsByStatus(activeTab).length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No {activeTab} bookings</h3>
            <p className="text-gray-500 mb-6">
              {activeTab === 'upcoming' 
                ? "You don't have any upcoming bookings. Start planning your next trip!"
                : `You don't have any ${activeTab} bookings.`
              }
            </p>
            {activeTab === 'upcoming' && (
              <button 
                onClick={() => navigate('/phnompenh')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Browse Hotels
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}