'use client'

import Adminsidebar from '@/app/components/adminsidebar'
import Listing from '@/app/components/listing'
import Navbar from '@/app/components/navbar'
import ProtectedAdmin from '@/app/components/ProtectedAdmin'
import ProtectedRoutes from '@/app/components/ProtectedRoutes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Categories = () => {

  // ProtectedRoutes()
  // ProtectedAdmin()

  const [categorydata, setcategorydata] :any = useState(null) 
  const [screendisplay, setscreendisplay] :any = useState('overflow-scroll') 

  useEffect(()=>{

    getdata()

  }, [])

  const getdata = async ()=>{

    let res = await axios.get('http://localhost:2005/api/port1')
    setcategorydata(res.data.categories)
    
  }

  
    const handledisplay = (display:any)=>{

      screendisplay == 'overflow-hidden'?
        setscreendisplay('overflow-scroll'):
        setscreendisplay('overflow-hidden')

      
    }

  return (

    <div className={`w-full h-screen overflow-hidden flex flex-col`}>
      <Navbar/>
      <div className='flex h-[73%]'>
        <Adminsidebar sideoption = {"categories"}/>
        <div className={`w-[82%] ${screendisplay}`}>
          {categorydata && <Listing data ={categorydata} getdata = {getdata} handledisplay = {handledisplay} />} 
        </div>
      </div>
    </div>
  )
}

export default Categories