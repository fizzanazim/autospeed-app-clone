import Link from 'next/link'
import React from 'react'

const Success = () => {
  return (
    <div className='flex flex-col items-center h-screen justify-center bg-red-100'>
      <h3 className='text-2xl'>Your order is placed successfully</h3>
      <Link className='px-2 py-2 w-max cursor-pointer text-red-500' href={'/'}>Discover More</Link>
    </div>
  )
}

export default Success