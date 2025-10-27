'use client'

import Link from 'next/link'
import React from 'react'
import { IoMdHome } from "react-icons/io";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiCategoryAlt } from "react-icons/bi";
import { IoIosLogOut } from "react-icons/io";
import { FaBorderAll } from "react-icons/fa";

const Adminsidebar = ({sideoption}:any) => {
  return (
    <div className='w-[18%] bg-black p-5 text-white flex justify-between flex-col'>
        <div>
        <ul className='flex flex-col gap-4 text-white'>
            <Link href={'/admin'}><li className={`flex items-center gap-3 ${sideoption=="home"? 'text-red-300': ''} cursor-pointer`}><IoMdHome/> Dashboard</li></Link>
            <Link href={'/admin/categories'}><li className={`flex items-center gap-3 ${sideoption=="categories"? 'text-red-300': ''} cursor-pointer`}><BiCategoryAlt/> Categories</li></Link>
            <Link href={'/admin/products'}><li className={`flex items-center gap-3 ${sideoption=="products"? 'text-red-300': ''} cursor-pointer`}><MdProductionQuantityLimits/> Products</li></Link>
            <Link href={'/admin/orders'}><li className={`flex items-center gap-3 ${sideoption=="order"? 'text-red-300': ''} cursor-pointer`}><FaBorderAll/> Orders</li></Link>
        </ul>
        </div>
        <div className='flex items-center gap-3'><IoIosLogOut/>Logout</div>
    </div>
    
  )
}

export default Adminsidebar