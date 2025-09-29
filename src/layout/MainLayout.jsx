import React from 'react'
import Footer from '../components/Footer' 
import MainRoute from '../Routes/MainRoute' 
import Nav from '../components/Nav'

export default function MainLayout() {
  return (
    <div>
      <Nav/>
      <MainRoute/>
      <Footer/>
    </div>
  )
}