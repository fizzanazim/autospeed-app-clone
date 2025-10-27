'use client'

import Link from 'next/link'
import React from 'react'
import Navbar from '../components/navbar'
import Adminsidebar from '../components/adminsidebar'
import ProtectedRoutes from '../components/ProtectedRoutes'
import ProtectedAdmin from '../components/ProtectedAdmin'

const Admin = () => {

  ProtectedRoutes()
  ProtectedAdmin()

  return (
    <div className='w-full min-h-screen flex flex-col'>
      <Navbar/>
      <div className='flex flex-1'>
        <Adminsidebar sideoption = {"home"}/>
        <div className='w-[82%] flex items-center justify-center gap-20'>
          <Link className='border-2 bg-red-100 border-red-600 text-red-600 px-10 rounded h-15 flex items-center justify-center cursor-pointer' href={'/admin/categories'}>CATEGORIES</Link>
          <Link className='border-2 bg-red-100 border-red-600 text-red-600 px-10 rounded h-15 flex items-center justify-center cursor-pointer' href={'/admin/products'}>PRODUCTS</Link>
          <Link className='border-2 bg-red-100 border-red-600 text-red-600 px-10 rounded h-15 flex items-center justify-center cursor-pointer' 
          href={'/admin/orders'}>ORDERS</Link>
        </div>
      </div>
    </div>
  )
}

export default Admin