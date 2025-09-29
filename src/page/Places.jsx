import React from 'react'
import { Link } from 'react-router-dom'

export default function Places() {
  return (
    <div>
        <h1 className='my-3 font-bold text-3xl flex justify-center mt-[100px]'>Places</h1>
        <div className='grid lg:grid-cols-4 gap-4 px-5 py-5 md:grid-cols-2 sm:grid-cols-1'>          
            <div class="card w-full h-full flex flex-col relative">
              <Link to={'/phnompenh'}>
              <div class="w-full h-full relative">

                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Phnom Penh
                </div>
                
                <img src="/image/PP.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
              </Link>
            </div>
            <div class="card w-full h-full flex flex-col relative">
              <Link to={'/siemreap'}>
              <div class="w-full h-full relative">

                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Siem Reap
                </div>
                
                <img src="/image/SR.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
              </Link>
            </div>

            
            <div class="card w-full h-full flex flex-col relative">
              <Link to={'/kampot'}> 
              <div class="w-full h-full relative">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Kampot
                </div>
                <img src="/image/Kampot.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
              </Link>
            </div>
            <div class="card w-full h-full flex flex-col relative">
              <div class="w-full h-full relative">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Sihanoukville <br /> <p className='text-red-400'>Comming soon...</p>
                </div>
                
                <img src="/image/Sihanoukville.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
            </div>
            <div class="card w-full h-full flex flex-col relative">
              <div class="w-full h-full relative">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Battambang <br /> <p className='text-red-400'>Comming soon...</p>
                </div>
                
                <img src="/image/battambang.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
            </div>
            <div class="card w-full h-full flex flex-col relative">
              <div class="w-full h-full relative">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Kampong Thom <br /> <p className='text-red-400'>Comming soon...</p>
                </div>
                
                <img src="/image/Kampong Thom.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
            </div>
            <div class="card w-full h-full flex flex-col relative">
              <div class="w-full h-full relative">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Kep<br /> <p className='text-red-400'>Comming soon...</p>
                </div>
                
                <img src="/image/Kep.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
            </div>
            <div class="card w-full h-full flex flex-col relative">
              <div class="w-full h-full relative">
                <div class="absolute top-2 left-1/2 -translate-x-1/2 bg-white/70 px-3 py-1 rounded-md text-center font-semibold">
                  Koh Kong <br /> <p className='text-red-400'>Comming soon...</p>
                </div>
                
                <img src="/image/Koh Kong.jpg" alt="" class="w-full h-full rounded-[17px]" />
              </div>
            </div>

        </div>
    </div>
  )
}
