'use client'

import React, { useState } from 'react'
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import Herosectioncontent from '../herosectioncontent';

const Herosection = () => {

    const [margin, setmargin] = useState('ml-0')
    const [transform, settransform] :any = useState('')
    

    const handleleftclick = ()=>{

        setmargin('ml-0')

        settransform('-translate-y-[120%]')

        setTimeout(() => {
            
            settransform('')

        }, 1000);

        
    }

    const handlerightclick = ()=>{

        setmargin('-ml-[100%]')

        settransform('-translate-y-[120%]')

        setTimeout(() => {
            
            settransform('')

        }, 1000);

    }

  return (
    <div className='group relative w-full h-[550px] overflow-hidden'>
        <div className={`w-[200%] bg-green-100 h-full flex items-center justify-center overflow-hidden ${margin}`}>
            <div className={`w-1/2 h-full hero-section1 flex items-center justify-center`}>
                <Herosectioncontent transformprop = {transform} />      
            </div>
            <div className={`hero-section2 h-full w-1/2 flex items-center justify-center`}>
                <Herosectioncontent transformprop = {transform}/>      
            </div>
        </div>
        <div onClick={handleleftclick} className='w-10 h-10 rounded absolute hidden group-hover:flex left-10 top-1/2 -translate-1/2 items-center justify-center text-white text-xl cursor-pointer hover:bg-red-500 duration-300 bg-[rgba(200,200,200,0.4)]'><IoArrowBackCircleOutline/></div>
        <div onClick={handlerightclick} className='w-10 h-10 rounded absolute hidden group-hover:flex right-5 top-1/2 -translate-1/2 items-center justify-center text-white text-xl cursor-pointer hover:bg-red-500 duration-300 bg-[rgba(200,200,200,0.4)]'><IoArrowForwardCircleOutline/></div>
    </div>
  )
}

export default Herosection