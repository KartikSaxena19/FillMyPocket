import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
      <footer className='bg-gray-900 text-white flex items-center justify-center px-4 h-16 bottom-0 w-full'>
        <p className='text-center'>Copywrite &copy;{currentYear} FIll My Pocket- All rights reserved!</p>
      </footer>
  )
}

export default Footer
