import React from 'react'
import { assets } from '../assets/assets'

const About = () => {
  return (
    <div>

      <div className='text-center text-2xl pt-10 text-[#707070]'>
        <p>ABOUT <span className='text-gray-700 font-semibold'>US</span></p>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-12'>
  <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="" />
  <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
    <p>Welcome to Medislot, your reliable solution for managing doctor appointments with ease and convenience. At Medislot, we recognize the hassle patients face in booking medical visits and keeping track of their health schedules.</p>
    <p>Medislot is dedicated to simplifying healthcare access through technology. Our platform is designed to offer a smooth and efficient appointment booking experience while helping users stay informed and connected with their healthcare providers. Whether it's your first consultation or a follow-up, Medislot ensures a hassle-free journey.</p>
    <b className='text-gray-800'>Our Vision</b>
    <p>Our vision at Medislot is to empower individuals with easy access to quality healthcare. We aim to connect patients and doctors through an intuitive and user-friendly system, reducing wait times and enhancing the overall healthcare experience.</p>
  </div>
</div>


      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>EFFICIENCY:</b>
          <p>Streamlined appointment scheduling that fits into your busy lifestyle.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>CONVENIENCE: </b>
          <p>Access to a network of trusted healthcare professionals in your area.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALIZATION:</b>
          <p >Tailored recommendations and reminders to help you stay on top of your health.</p>
        </div>
      </div>

    </div>
  )
}

export default About
