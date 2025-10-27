'use client'

import React from 'react'
import { MdStars } from "react-icons/md";
import { SiTicktick } from "react-icons/si";
import { GiStickGrenade } from "react-icons/gi";
import { ImTicket } from "react-icons/im";
import { BsStickies } from "react-icons/bs";
// import { Decreqty, Increqty, RemoveItem } from '../Redux/Actions/Actions';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Decreqty, Increqty, RemoveItem } from '@/app/Redux/Actions';

const Sidebar = () => {

    const {cartarray} = useSelector((state:any)=>state.addtocartreducer)
    const dispatch = useDispatch()

    const increment = (i:any)=>{

        dispatch(Increqty(i))

    }

    const decrement = (e:any,i:any)=>{

        console.log("before");
        
        
        if(e.buyerqty>1){
            
            console.log("after");
            dispatch(Decreqty(i))

        }

    }

    const removeitem = (i:any)=>{

        dispatch(RemoveItem(i))

    }

  return (
    <div className='w-full bg-white pt-8 h-screen overflow-auto'>
        <div className='px-8 flex flex-col gap-5'>
            <h2>Shopping Cart</h2>
            <h4>These products are limited, checkout within 2m 10s</h4>
            <h4>Congrats! You are eligible for FREE Shipping</h4>
            <div className='w-full h-1 bg-green-400 relative '>
                <MdStars className='absolute top-1/2 right-0 text-green-600 text-2xl -translate-y-1/2'/>
            </div>
            <div className='bg-gray-200 px-5 flex gap-2 items-center h-10 w-full text-sm'><SiTicktick className='text-green-600'/>“Platform trainers” has been added to your cart.</div>
            <div className='min-h-[200px] pb-6'>
                {

                    cartarray.length!=0&& cartarray.map((e:any,i:any)=>{

                        return(       
                            
                            <div className='flex gap-5'>
                                <div>
                                    <img className='w-25' src={e.proimg} alt="" />
                                </div>
                                <div className='flex flex-col gap-1'>
                                    <h2 className='capitalize text-lg'>{e.proname}</h2>
                                    <h2>Category: {e.category}</h2>
                                    <h2>${e.proprice}</h2>
                                    <div className='flex gap-4'>
                                        <div className='flex items-center justify-between rounded px-3 w-28 bg-[#F1F1F1] h-10'>
                                            <button onClick={()=>decrement(e,i)} className='text-2xl cursor-pointer'>-</button> 
                                            <span>{e.buyerqty}</span> 
                                            <button onClick= {()=>increment(i)} className='text-2xl cursor-pointer'>+</button>
                                        </div>
                                        <button onClick={()=>removeitem(i)} className='cursor-pointer'>remove</button>
                                    </div>
                                </div>
                            </div>

                        )

                    })

                }
            </div>
        </div>
        <div className='min-h-[300px] flex flex-col bg-[#F1F1F1] px-8 py-4'>
            <div className='w-full flex items-center justify-center'>
                <div className='px-10 h-10 flex flex-col items-center justify-center'>
                    <BsStickies/>
                    <h2>Shipping</h2>
                </div>
                <div className='border-l border-r px-10 h-10 flex flex-col items-center justify-center'>
                    <GiStickGrenade/>
                    <h2>Note</h2>
                </div>
                <div className='px-10 h-10 flex flex-col items-center justify-center'>
                    <ImTicket/>
                    <h2>Coupon</h2>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <p>SUBTOTAL</p>
                <p>$
                    {

                        cartarray.reduce((init:any, e:any)=>{

                            return init + (e.buyerqty * e.proprice)

                        }, 0)

                    }
                </p>
            </div>
            <div className='flex items-center justify-between border-b pb-4'>
                <p>SHIPPING</p>
                <div className='flex flex-col items-end justify-between'>
                    <p>FREE SHIPPING</p>
                    <p>FLAT SHIPPING $10.00</p>
                </div>
            </div>
            <div className='flex items-center justify-between h-14'>
                <p>TOTAL</p>
                <p>${cartarray.reduce((init:any, e:any)=>{

                            return init + (e.buyerqty * e.proprice)

                        }, 10)}</p>
            </div>
            <Link href={'/checkout'}><button className='w-full cursor-pointer h-12 border rounded bg-white '>CHECKOUT</button></Link>
            <button className='w-full h-12'>VIEW CART</button>
        </div>
    </div>
  )
}

export default Sidebar