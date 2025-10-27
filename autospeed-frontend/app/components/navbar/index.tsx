'use client'

import React, { useEffect, useState } from 'react'
import { FaEnvelopeOpen } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { MdKeyboardArrowDown } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import { CiHeart } from "react-icons/ci";
import { CiShoppingCart } from "react-icons/ci";
import { RxHamburgerMenu } from "react-icons/rx";
import { TfiLightBulb } from "react-icons/tfi";
import { PiSignInLight } from "react-icons/pi";
import { GoSignOut } from "react-icons/go";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Sidebar from '../Sidebar';
import { useRouter } from 'next/navigation';


const Navbar = () => {

    const { cartarray } = useSelector((state: any) => state.addtocartreducer)
    const [sidebardisplay, setSidebardisplay]: any = useState('hidden')
    const [token, settoken]:any = useState('')
    const [userFound, setUserFound]:any = useState('')
    const [screendisplay, setscreendisplay] = useState('min-h-screen')

    const router = useRouter()

    useEffect(() => {

        if (typeof window != "undefined") {

            settoken(localStorage.getItem('token') || '')

        }

        setUserFound(()=>{
            
            const storedUser = localStorage.getItem('user_found')
            return storedUser ? JSON.parse(storedUser): {}

        })

    }, [])



    const handlesidebar = () => {

        setSidebardisplay('hidden')
        // setscreendisplay('min-h-screen')

    }

    const handlecartclick = () => {

        setscreendisplay('overflow-hidden')
        setSidebardisplay('block')

    }

    const handlesignout = ()=>{

        localStorage.setItem('token', '')
        router.push('/sign-in')

    }

    return (
        <div className={`w-full md:min-h-20 shadow relative`}>
            <div className='h-9 text-white flex bg-black items-center justify-between px-20'>
                <div className='flex items-center text-sm min-w-1/2'>
                    <h2 className='px-3'>Welcome to Autoparts online Store</h2>
                    <h2 className='border-x px-3 flex gap-2 items-center'><CiDeliveryTruck className='text-red-500' /> Track Your order</h2>
                    <h2 className='px-3 flex gap-2 items-center'><FaEnvelopeOpen className='text-red-500' /> prestashopdemo@hotmail.com</h2>
                </div>
                <div className='flex gap-3 items-center'>
                    <h2>Language</h2>
                    <h2>$ Currency</h2>
                </div>
            </div>
            <div className='h-25 flex items-center border-b border-gray-300 px-20'>
                <div className='w-2/3 h-full flex items-center justify-between'>
                    <div className='w-50'>
                        <img src="https://opencart.dostguru.com/AS01/autospeed_01/image/catalog/logo.png" alt="" />
                    </div>
                    <div className='flex items-center w-3/4 h-full '>
                        <div className='relative w-[90%]'>
                            <input type="text" placeholder='Search' className='pl-4 pr-35 h-13 rounded-l border w-full' />
                            <div className='px-4 border-l flex gap-2 items-center text-sm absolute top-1/2 right-0 border-gray-400 -translate-y-1/2'>Categories <MdKeyboardArrowDown className='text-xl' /></div>
                        </div>
                        <button className='w-[10%] hover:bg-red-500 duration-200 flex items-center rounded-r justify-center text-2xl cursor-pointer bg-black text-white h-13'><CiSearch /></button>
                    </div>
                </div>
                <div className='w-1/3 flex justify-end'>
                    <ul className='flex gap-8'>
                        {userFound?.role == 'admin' &&
                            <Link href={'/admin'}>
                                <li className='flex flex-col hover:text-red-500 duration-200 items-center gap-1 cursor-pointer'>
                                    <GrUserAdmin className='text-2xl' />
                                    Admin
                                </li>
                            </Link>}
                        {token ?
                            <button onClick={handlesignout}>
                                <li className='flex flex-col hover:text-red-500 duration-200 items-center gap-1 cursor-pointer'>
                                    <GoSignOut className='text-2xl' />Sign Out
                                </li>
                                <li className='flex items-center justify-center'>{userFound.firstname}</li>
                            </button> :
                            <Link href={'/sign-in'}>
                                <li className='flex flex-col hover:text-red-500 duration-200 items-center gap-1 cursor-pointer'>
                                    <PiSignInLight className='text-2xl' />Sign In
                                </li>
                            </Link>
                        }

                        <li className='flex flex-col hover:text-red-500 duration-200 items-center gap-1 cursor-pointer'><CiHeart className='text-2xl' />My Wishlist</li>
                        <li onClick={handlecartclick} className='flex flex-col hover:text-red-500 duration-200 relative items-center gap-1 cursor-pointer'><CiShoppingCart className='text-2xl' />
                            My Cart
                            <div className='h-5 w-5 rounded-full bg-red-600 text-white flex items-center justify-center text-sm absolute -top-2 right-0'>
                                {
                                    cartarray && cartarray.reduce((init: any, e: any) => {

                                        return init + e.buyerqty

                                    }, 0)
                                }
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='h-12 px-20 flex'>
                <div className='w-2/3 flex h-full items-center'>
                    <button className='w-1/3 bg-red-500 cursor-pointer h-full text-xl flex justify-between items-center px-4 text-white'>All Categories<RxHamburgerMenu /></button>
                    <div className='w-2/3 h-full'>
                        <ul className='w-full flex justify-between h-full px-10 items-center'>
                            <Link href={'/'}><li className='cursor-pointer hover:text-red-500 duration-200'>HOME</li></Link>
                            <li className='cursor-pointer hover:text-red-500 duration-200'>SPECIALS</li>
                            <li className='cursor-pointer hover:text-red-500 duration-200'>CONTACT</li>
                            <li className='cursor-pointer hover:text-red-500 duration-200'>SITEMAP</li>
                            <li className='cursor-pointer hover:text-red-500 duration-200'>BRAND</li>
                        </ul>
                    </div>
                </div>
                <div className='w-1/3 flex justify-end h-full items-center'>
                    <h2 className='flex items-center h-full gap-1 text-sm hover:text-red-500 cursor-pointer duration-200'><TfiLightBulb />SPECIAL UP TO 30% OFF AL ITEMS</h2>
                </div>
            </div>
            <div onClick={handlesidebar} className={`${sidebardisplay} z-30 h-screen ${screendisplay} w-full bg-[rgba(100,100,100,0.3)] absolute top-0 left-0`}></div>
            <div className={`${sidebardisplay} w-[30%] min-h-screen absolute z-30 top-0 right-0`}>
                <Sidebar />
            </div>
        </div>
    )
}

export default Navbar