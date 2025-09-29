import React, { useState, useEffect } from 'react';
import { CgProfile } from "react-icons/cg";
import { TiThMenuOutline } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";
import { Link } from 'react-router-dom';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

 
  useEffect(() => {
    const checkLoginStatus = () => {
      const user = JSON.parse(localStorage.getItem('currentUser'));
      if (user) {
        setIsLoggedIn(true);
        setCurrentUser(user);
      } else {
        setIsLoggedIn(false);
        setCurrentUser(null);
      }
    };

    
    checkLoginStatus();

    
    window.addEventListener('storage', checkLoginStatus);
    
    
    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setIsLoggedIn(false);
    setCurrentUser(null);
    setOpen(false); 
  };

  return (
    <div>
     
      <nav className="w-full h-20 shadow-md fixed top-0 z-10 hidden lg:flex bg-white">
        <div className="logo w-[20%] h-20 flex justify-center items-center pl-5">
          <img src="/image/logo.jpg" alt="logo" className="w-[150px] h-20 rounded-md" />
          <div className="menu w-[60%] h-20 flex justify-center items-center">
            <h1 className="text-black font-bold text-2xl">Easy Sleep</h1>
          </div>
        </div>
        
        <div className="menu w-[80%] h-20 flex justify-evenly items-center">
          <ul className="flex gap-10 text-black font-bold">
            <li className="cursor-pointer hover:text-blue-400">
              <Link to='/'>Home</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">
              <Link to='/places'>Places</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">
              <Link to='/booking'>Booking</Link>
            </li>
            <li className="cursor-pointer hover:text-blue-400">About</li>
            <li className="cursor-pointer hover:text-blue-400">Contact</li>
          </ul>
        </div>

        <div className="login w-[10%] h-20 flex justify-center items-center">
          {isLoggedIn ? (
            <div className="flex gap-1 items-center mr-[120px] ">
              <Link to='/profile' className="flex items-center gap-2">
                <CgProfile className="w-[30px] h-[40px]" />
                <span className="hidden xl:block">{currentUser?.name || 'Profile'}</span>
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 w-[130px] px-2 py-2 rounded-md hover:border-red-500 hidden xl:block"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button className="border-2 px-4 py-2 rounded-md hover:border-blue-500">
              <Link to='/signin'>Sign in</Link>
            </button>
          )}
        </div>
      </nav>

      <nav className="w-full h-20 shadow-md fixed top-0 z-10 flex lg:hidden bg-white">
        <div className="logo w-[20%] h-20 flex justify-center items-center pl-5">
          <img src="/image/logo.jpg" alt="logo" className="w-[100px] h-20 rounded-md" />
        </div>
        <div className="w-[60%] h-20 flex justify-center items-center ml-3">
          <h1 className="text-black font-bold text-2xl">Easy Sleep</h1>
        </div>
        <div className='flex justify-end pr-7 text-2xl w-[20%] mt-8'>
          <div onClick={() => setOpen(!open)} className="cursor-pointer">
            {!open ? <TiThMenuOutline /> : <IoMdClose />}
          </div>
        </div>

        
        <div 
          className={`fixed top-0 left-0 w-full h-full bg-black/40 z-30 transition-opacity ${
            open ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setOpen(false)}
        ></div>

       
        <div className={`fixed top-0 left-0 w-3/4 h-full bg-white z-40 transform transition-transform ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="pt-20 px-6">
            <ul className='text-xl font-bold space-y-4'>
              <li className='py-2 cursor-pointer hover:text-blue-400'>
                <Link to='/' onClick={() => setOpen(false)}>Home</Link>
              </li>
              <li className='py-2 cursor-pointer hover:text-blue-400'>
                <Link to='/places' onClick={() => setOpen(false)}>Places</Link>
              </li>
              <li className='py-2 cursor-pointer hover:text-blue-400'>
                <Link to='/booking' onClick={() => setOpen(false)}>Booking</Link>
              </li>
              <li className='py-2 cursor-pointer hover:text-blue-400'>About</li>
              <li className='py-2 cursor-pointer hover:text-blue-400'>Contact</li>
              
              
              <li className='py-2 border-t mt-4 pt-4'>
                {isLoggedIn ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-green-600">
                      <CgProfile className="w-6 h-6" />
                      <span>Welcome, {currentUser?.name || 'User'}!</span>
                    </div>
                    <Link 
                      to='/profile' 
                      onClick={() => setOpen(false)} 
                      className="block py-2 cursor-pointer hover:text-blue-400"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="border-2 px-4 py-2 rounded-md hover:border-red-500 w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link 
                    to='/signin' 
                    onClick={() => setOpen(false)} 
                    className="border-2 px-4 py-2 rounded-md hover:border-blue-500 inline-block"
                  >
                    Sign in
                  </Link>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}