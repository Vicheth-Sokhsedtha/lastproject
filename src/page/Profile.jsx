import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from localStorage (from sign in/sign up)
    const userData = localStorage.getItem('currentUser');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if no user data
      navigate('/signin');
      return;
    }

    // Get bookings from localStorage
    const userBookings = localStorage.getItem('userBookings');
    if (userBookings) {
      const allBookings = JSON.parse(userBookings);
      // Filter bookings for current user
      const userSpecificBookings = allBookings.filter(booking => 
        booking.userEmail === JSON.parse(userData).email
      );
      setBookings(userSpecificBookings);
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    
    // Update user data in localStorage
    const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
    const updatedUsers = allUsers.map(u => 
      u.email === user.email ? user : u
    );
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const cancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // Update bookings in localStorage
      const allBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      const updatedBookings = allBookings.map(booking =>
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled', cancelDate: new Date().toISOString().split('T')[0] }
          : booking
      );
      
      localStorage.setItem('userBookings', JSON.stringify(updatedBookings));
      
      // Update local state
      setBookings(bookings.map(booking =>
        booking.id === bookingId 
          ? { ...booking, status: 'Cancelled', cancelDate: new Date().toISOString().split('T')[0] }
          : booking
      ));
      
      alert('Booking cancelled successfully!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/signin');
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[100px]">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
          <p className="text-gray-600">Manage your account and bookings</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Sign Out
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Personal Information</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={user.name || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={user.email || ''}
                    onChange={handleInputChange}
                    disabled={true} // Email cannot be changed
                    className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={user.phone || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={user.dateOfBirth || ''}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={user.address || ''}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>

              {isEditing && (
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                >
                  Save Changes
                </button>
              )}
            </form>
          </div>

          {/* Booking History */}
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-4">My Bookings</h2>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{booking.hotelName}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      booking.status === 'Confirmed' 
                        ? 'bg-green-100 text-green-800'
                        : booking.status === 'Completed'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Check-in:</span>
                      <p>{booking.checkIn}</p>
                    </div>
                    <div>
                      <span className="font-medium">Check-out:</span>
                      <p>{booking.checkOut}</p>
                    </div>
                    <div>
                      <span className="font-medium">Guests:</span>
                      <p>{booking.guests}</p>
                    </div>
                    <div>
                      <span className="font-medium">Total:</span>
                      <p className="text-green-600 font-semibold">${booking.totalPrice}</p>
                    </div>
                  </div>

                  {booking.status === 'Confirmed' && (
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="text-red-600 hover:text-red-800 text-sm font-medium"
                      >
                        Cancel Booking
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  )}
                </div>
              ))}

              {bookings.length === 0 && (
                <p className="text-center text-gray-500 py-8">No bookings found.</p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar - Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white shadow-lg rounded-2xl p-6">
            <h3 className="font-semibold mb-4">Account Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Bookings:</span>
                <span className="font-semibold">{bookings.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Upcoming Trips:</span>
                <span className="font-semibold text-green-600">
                  {bookings.filter(b => b.status === 'Confirmed').length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed:</span>
                <span className="font-semibold text-blue-600">
                  {bookings.filter(b => b.status === 'Completed').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
            <h3 className="font-semibold text-blue-800 mb-2">Need Help?</h3>
            <p className="text-blue-700 text-sm mb-4">
              Contact our support team for any questions about your bookings or account.
            </p>
            <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-medium">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}