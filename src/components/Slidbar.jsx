import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';



// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Slidbar() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <>
      <Swiper 
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper h-[450px] w-full rounded-lg mt-[125px] "
      >
        <SwiperSlide className='bg-red-200 w-full h-full'>
          <img src="public/image/banner1.jpg" alt="" className='w-full h-full'/>
        </SwiperSlide>
        <SwiperSlide className='bg-blue-200'>
          <img src="public/image/banner2.jpg" alt="" className='w-full h-full'/>
        </SwiperSlide>
        <SwiperSlide className='bg-green-200'>
          <img src="public/image/banner3.jpg" alt="" className='w-full h-full'/>
        </SwiperSlide>
        <SwiperSlide className='bg-yellow-200'>
          <img src="public/image/banner4.jpg" alt="" className='w-full h-full'/>
        </SwiperSlide>
        <SwiperSlide className='bg-purple-200'>
          <img src="public/image/banner5.jpg" alt="" className='w-full h-full'/>
        </SwiperSlide>
        
        <div className="autoplay-progress h-[400px]" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            {/* <circle cx="4" cy="4" r="2"></circle> */}
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      {/* Mobile Slidebar */}


    </>
  );
}
