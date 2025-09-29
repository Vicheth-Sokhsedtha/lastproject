import React from 'react'

import Places from './Places'
import PhnomPenh from './PhnomPenh' 
import Slidbar from '../components/Slidbar'
import Kampot from './Kampot'
import SiemReap from './SiemReap'

export default function Home() {
  return (
    <div className='w-full'>
      <Slidbar/>
      <Places/>
      <PhnomPenh/>
      <SiemReap/>
      <Kampot/>
    </div>
  )
}