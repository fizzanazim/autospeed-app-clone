'use client'

import React, { useState } from 'react'
import { CiStar } from "react-icons/ci";


const Stars = () => {

    const [rating, setrating] = useState(3.2)
    const [ratingtemp, setratingtemp] = useState(`${(rating - Math.floor(rating))*100}%`)

  return (
    <div className='flex'>
        {Array(5).fill(null).map((e, i) => {
            let className = '';
            if (Math.floor(rating) <= i) {
                className = 'bg-yellow-400';
            } else if (rating - Math.floor(rating) > 0.1 && rating - Math.floor(rating)<=0.9) {
                className = `bg-gradient-to-r from-yellow-400 from-[${ratingtemp}%] to-white to-[${ratingtemp}%]` // You may want to use a gradient here based on ratingtemp
            }
            else{

                className = 'bg-white'
            }
            

            return(
            
                <div>
                    <CiStar className={className}/>{i}
                </div>
                
            )
        })}
    </div>
  )
}

export default Stars