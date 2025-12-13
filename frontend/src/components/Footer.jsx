import React from 'react'
import Logo from './Logo'

const Footer = () => {
  return (
    <div className='md:mx-10 bg-black text-white'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          <div className='mb-5'>
            <Logo className='w-40' />
          </div>
          <p className='w-full md:w-2/3 text-gray-300 leading-6'>NeuraWell is your trusted healthcare companion, connecting you with qualified medical professionals for comprehensive care. We're committed to making healthcare accessible and convenient for everyone.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-300'>
            <li>Home</li>
            <li>About us</li>
            <li>Services</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5 text-white'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-300'>
            <li>+1-212-456-7890</li>
            <li>contact@neurawell.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className='border-gray-600' />
        <p className='py-5 text-sm text-center text-gray-400'>Copyright 2024 @ NeuraWell.com - All Right Reserved.</p>
      </div>

    </div>
  )
}

export default Footer
