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
    <p>Welcome to Medislot — your go-to platform for booking structured, time-slot appointments with specialists who run strict schedules. We understand that professionals like Counsellors, Dentists, Dermatologists, Hair Specialists, and Opticians operate on precise timetables, and we've built our platform around that reality.</p>
    <p>Medislot is designed for people who value their time and want a frictionless booking experience. Browse availability in real time, pick an exact time slot, and show up prepared — no waiting rooms, no confusion, no wasted time. Whether it's a therapy session, a dental check-up, a skin consultation, a hair treatment, or an eye exam, Medislot keeps your health schedule tight and organised.</p>
    <b className='text-gray-800'>Our Vision</b>
    <p>We envision a world where every appointment-based healthcare and wellness professional is just a click away — with full slot visibility, zero scheduling chaos, and a seamless experience for both patients and practitioners.</p>
  </div>
</div>


      <div className='text-xl my-4'>
        <p>WHY  <span className='text-gray-700 font-semibold'>CHOOSE US</span></p>
      </div>

      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>STRICT SCHEDULING:</b>
          <p>Built for specialists who work on exact time slots — Counsellors, Dentists, Dermatologists, Hair Specialists, Opticians & more.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>ZERO WAIT-TIME BOOKING:</b>
          <p>Pick an exact slot that works for you and your specialist — no queues, no double bookings, no surprises.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>PERSONALISATION:</b>
          <p>Smart reminders, specialist history, and tailored recommendations to keep your health and wellness on track.</p>
        </div>
      </div>

    </div>
  )
}

export default About
