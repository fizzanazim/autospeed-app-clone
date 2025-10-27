'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import { AddtoCart, ShowSideBar } from '@/app/Redux/Actions';

const ProductDisplay = ({ obj }: any) => {

    const [counter, setCounter]: any = useState(1)
    const dispatch = useDispatch()
    const [token, settoken] = useState('')

    useEffect(() => {

        if (typeof window != "undefined") {

            settoken(localStorage.getItem('token') || '')

        }

    }, [])
    
    const router = useRouter()
    
    const handleaddtocart = () => {
        
        if (token) {
            console.log(token, 'token');

            dispatch(ShowSideBar())
            dispatch(AddtoCart({...obj, buyerqty: 0}, counter))

        }
        else {

            router.push('/sign-in')

        }


    }

    const decquanity = () => {

        counter > 1 ? setCounter(counter - 1) : counter


    }

    const incquanity = () => {

        counter < 10 ? setCounter(counter + 1) : counter

    }

    useEffect(() => {

        console.log(counter);

    }, [counter])

    return (
        <div className='flex w-full mt-6 gap-8'>
            <div className='w-[40%] p-5 flex items-center justify-center border border-gray-500 rounded'>
                <img className='w-full' src={obj?.proimg} alt="" />
            </div>
            <div className='flex flex-1 flex-col'>
                <h2 className='text-3xl content-center font-bold h-14'>{obj?.proname}</h2>
                <div className='h-14 w-full border-y border-gray-300 flex items-center mt-3'>
                    <p className='flex border-r border-gray-300 px-5'><CiStar /><CiStar /><CiStar /><CiStar /><CiStar /></p>
                    <p className='px-5 border-r border-gray-300'>0 reviews</p>
                    <p className='px-5'>Write a Review</p>
                </div>
                <div className='h-25 border-b border-gray-300 gap-1 flex justify-center flex-col'>
                    <h2 className=' text-3xl font-semibold'>${Number(obj?.proprice).toFixed(2)}</h2>
                    <h2>Ex Tax: $100.00</h2>
                </div>
                <div className='flex flex-col h-40 justify-center gap-2'>
                    <h2>Brand:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apple</h2>
                    <h2>Product Code:&nbsp;&nbsp;&nbsp;{obj?._id}</h2>
                    <div className='flex'>Availability:&nbsp; &nbsp;&nbsp;
                        <div className='px-4 bg-green-200 rounded-md flex items-center justify-center'>In-stock</div>
                    </div>
                </div>
                <div className='flex px-4 w-full h-20 items-center justify-between bg-gray-100 rounded'>
                    <div className='flex item-center'>
                        <button onClick={decquanity} className='w-8 h-8 border border-gray-400 cursor-pointer rounded-tl rounded-bl'>-</button>
                        <div className='w-10 h-8 border border-gray-400 text-center content-center'>{counter}</div>
                        <button onClick={incquanity} className='w-8 h-8 border border-gray-400 cursor-pointer rounded-tr rounded-br'>+</button>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <div onClick={handleaddtocart} className="flex h-8 px-3 rounded cursor-pointer text-white bg-red-500 items-center gap-1"><TiShoppingCart className="text-2xl" />Add to Cart</div>
                        <div className="w-8 flex items-center cursor-pointer justify-center rounded text-white bg-red-500 h-8 text-2xl"><CiHeart /></div>
                        <div className="w-8 flex items-center cursor-pointer justify-center rounded text-white bg-red-500 h-8 text-2xl"><VscSettings /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDisplay