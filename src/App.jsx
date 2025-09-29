import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MainLayout from './layout/MainLayout'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <MainLayout/>
      </BrowserRouter>
    </div>
  )
}
