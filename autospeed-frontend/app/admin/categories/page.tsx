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

  useEffect(()=>{

    getdata()

  }, [])

  const getdata = async ()=>{

    let res = await axios.get('http://localhost:2005/api/port1')
    setcategorydata(res.data.categories)
    
  }

  return (

    <div className='w-full min-h-screen flex flex-col'>
      <Navbar/>
      <div className='flex flex-1'>
        <Adminsidebar sideoption = {"categories"}/>
        <div className='w-[82%]'>
          {categorydata && <Listing data ={categorydata} getdata = {getdata} />} 
        </div>
      </div>
    </div>
  )
}

export default Categories