'use client'

import React, { useEffect, useState } from 'react'

interface HerosectioncontentProps {
    transformprop: string;
}

const Herosectioncontent = ({ transformprop }: HerosectioncontentProps) => {

  return (
    <div className={`${transformprop} p-10 flex flex-col justify-center gap-3 items-center text-white w-[65%] font-sans`}>
        <h1 className='capitalize text-4xl'><span className='text-red-500'>welcome to</span> autoparts</h1>
        <h1 className='text-8xl font-bold'>NEW MODEL 2025</h1>
        <p className='text-center text-lg'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis at repellendus vero debitis hic doloribus tenetur earum aperiam exercitationem voluptas.</p>
        <div className='w-full pt-10 flex items-center justify-center'>
            <button className='bg-red-500 px-10 py-2 rounded cursor-pointer'>Shop Now</button>
        </div>
    </div>
  )
}

export default Herosectioncontent