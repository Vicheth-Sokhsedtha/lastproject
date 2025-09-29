import React from 'react'
// Fixed import path
import Footer from '../components/Footer' // Fixed import name and path
import MainRoute from '../Routes/MainRoute' // Fixed import path
import Nav from '../components/nav' // Fixed import path

export default function MainLayout() {
  return (
    <div>
      <Nav/>
      <MainRoute/>
      <Footer/>
    </div>
  )
}