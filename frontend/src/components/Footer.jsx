import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <img className='mb-5 w-40' src={assets.logo} alt="" />
          <p className='w-full md:w-2/3 text-gray-600 leading-6'>
          Medislot is built for strict appointment schedules. Book time-slot sessions with Counsellors, Dentists, Dermatologists, Hair Specialists, Opticians and more — pick your slot, show up, get seen. Zero waiting rooms, zero confusion.
          </p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
         <ul className='flex flex-col gap-2 text-gray-600'>
            <li><Link to='' className='hover:text-blue-500 transition'>Home</Link></li>
            <li><Link to='about' className='hover:text-blue-500 transition'>About Us</Link></li>
            <li><Link to='contact' className='hover:text-blue-500 transition'>Contact Us</Link></li>
            <li><Link to='doctors' className='hover:text-blue-500 transition'>Specialists</Link></li>
         </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-9168510465</li>
            <li>dco.2023.srgulhane@bitwardha.ac.in</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2025 @ MediSlot - All Rights Reserved by Sahil.</p>
      </div>

    </div>
  )
}

export default Footer
