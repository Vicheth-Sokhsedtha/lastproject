import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from '../page/Home'
import Error404 from '../components/Error404.jsx'
import Places from '../page/Places'
import Booking from '../page/Booking'
import About from '../page/About'
import Contact from '../page/Contact'
import SigninSignup from '../page/SigninSignup'
import Profile from '../page/Profile'
import PhnomPenh from '../page/PhnomPenh'
import SiemReap from '../page/SiemReap.jsx'
import Kampot from '../page/Kampot'
import DetailPP from '../page/DetailPP' // Fixed: DetailIPP → DetailPP
import DetailKP from '../page/DetailKP.jsx'
import DetailSR from '../page/DetailSR.jsx'

export default function MainRoute() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/places" element={<Places />} />
      <Route path="/booking" element={<Booking />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/signin" element={<SigninSignup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/phnompenh" element={<PhnomPenh />} />
      <Route path="/siemreap" element={<SiemReap />} /> {/* This route exists */}
      <Route path="/kampot" element={<Kampot />} />
      <Route path="/DetailPP/:id" element={<DetailPP />} /> {/* Fixed */}
      <Route path="/DetailKP/:id" element={<DetailKP />} />
      <Route path="/DetailSR/:id" element={<DetailSR />} />
      <Route path="*" element={<Error404 />} /> {/* 404 route */}
    </Routes>
  )
}