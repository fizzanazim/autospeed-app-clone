'use client'

import React, { useState } from 'react'
import { GiStickGrenade } from "react-icons/gi";
import { ImTicket } from "react-icons/im";
import { BsStickies } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { FaChevronRight } from "react-icons/fa";
import { IoLogoReddit } from "react-icons/io";
import Navbar from '../components/navbar';
import { loadStripe } from '@stripe/stripe-js';
import ProtectedRoutes from '../components/ProtectedRoutes';
import ProtectedAdmin from '../components/ProtectedAdmin';

const Checkout = () => {

    ProtectedRoutes()
    ProtectedAdmin()

    const { cartarray } = useSelector((state: any) => state.addtocartreducer)
    const [user_info, setuser_info]: any = useState(
        {

            firstname: '',
            lastname: '',
            country: '',
            streetnumber: '',
            town: '',
            zipcode: '',
            phone: '',
            email: ''

        }
    )

    console.log(cartarray, 'checkout');
    
    const handlecheckoutinput = (e: any) => {

        e.preventDefault()
        setuser_info({ ...user_info, [e.target.name]: e.target.value })

    }

    const handlecheckout = async () => {

        if (user_info.firstname != '' && user_info.lastname != '' && user_info.phone != '' && user_info.email != '') {

            
            const body = {
                products: cartarray,
                user_info: user_info
            }
            const headers = {
                "Content-Type": "application/json"
            }
            const response = await fetch("http://localhost:2005/api/create-checkout-session", {
                method: "POST",
                headers: headers,
                body: JSON.stringify(body)
            });

            const session = await response.json();
            const stripe: any = await loadStripe(session.frontendstripekey);

            console.log(session.frontendstripekey);
            
            const result = stripe.redirectToCheckout({
                sessionId: session.id
            });

            if (result.error) {
                console.log(result.error);
            }

        }
        else{
            alert("fields cannot be empty")
        }
    }

    return (
        <div>
            <Navbar />
            <div className='flex flex-col'>
                <div className='py-10'>
                    <h2 className='text-center text-4xl font-semibold'>Checkout</h2>
                    <p className='text-center flex gap-3 text-lg items-center justify-center mt-3'>Home <FaChevronRight /> Checkout</p>
                </div>
                {cartarray.length == 0 ? <p className='bg-[#E0E7E4] h-100 items-center flex justify-center text-4xl py-10 gap-6'><IoLogoReddit className='text-8xl' />Oops, your cart is empty!</p>

                    :

                    <div className='px-40 flex flex-col gap-3'>
                        <p>Returning customer? Click here to login</p>
                        <div className='flex justify-between'>
                            <div className='w-1/2 flex flex-col gap-3'>
                                <h2 className='text-3xl'>Billing Details</h2>
                                <form className='flex flex-col gap-5 pr-5' action="">
                                    <div className='flex justify-between gap-3'>
                                        <div className='flex flex-col w-1/2 gap-1'>
                                            <label htmlFor="firstname">First Name *</label>
                                            <input onChange={handlecheckoutinput} name='firstname' value={user_info.firstname} className='border border-gray-300 px-4 h-10 rounded' id='firstname' type="text" />
                                        </div>
                                        <div className='flex flex-col w-1/2 gap-1'>
                                            <label htmlFor="lastname">Last Name *</label>
                                            <input onChange={handlecheckoutinput} name='lastname' value={user_info.lastname} className='border border-gray-300 px-4 h-10 rounded' id='lastname' type="text" />
                                        </div>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="countryname">Country/ Region*</label>
                                        <input onChange={handlecheckoutinput} name='country' value={user_info.country} className='border border-gray-300 px-4 h-10 rounded' id='countryname' type="text" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="streetaddress">Street Address*</label>
                                        <input onChange={handlecheckoutinput} name='streetnumber' value={user_info.streetnumber} className='border border-gray-300 px-4 h-10 rounded' id='streetaddress' placeholder='House number and street number' type="text" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="towncity">Town/ City*</label>
                                        <input onChange={handlecheckoutinput} name='town' value={user_info.town} className='border border-gray-300 px-4 h-10 rounded' id='towncity' placeholder='House number and street number' type="text" />
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <label htmlFor="zipcode">ZIP Code*</label>
                                        <input onChange={handlecheckoutinput} name='zipcode' value={user_info.zipcode} className='border border-gray-300 px-4 h-10 rounded' id='zipcode' placeholder='House number and street number' type="number" />
                                    </div>
                                    <div className='flex justify-between gap-3'>
                                        <div className='flex flex-col w-1/2 gap-1'>
                                            <label htmlFor="Phone">phone*</label>
                                            <input onChange={handlecheckoutinput} name='phone' value={user_info.phone} className='border border-gray-300 px-4 h-10 rounded' id='Phone' placeholder='House number and street number' type="number" />
                                        </div>
                                        <div className='flex flex-col w-1/2 gap-1'>
                                            <label htmlFor="email">Email address*</label>
                                            <input onChange={handlecheckoutinput} name='email' value={user_info.email} className='border border-gray-300 px-4 h-10 rounded' id='email' placeholder='House number and street number' type="email" />
                                        </div>
                                    </div>
                                    <div>
                                        <input type="checkbox" id="check" />
                                        <label htmlFor="check">Ship to a different address?</label>
                                    </div>
                                </form>
                            </div>
                            <div className='w-1/2 flex flex-col gap-3 pl-10'>
                                <h2 className='text-2xl'>Order Summary</h2>
                                {
                                    cartarray.map((e: any, i: any) => {

                                        return (<>

                                            <div className='flex justify-between items-center h-25 border-t border-b border-gray-300'>
                                                <div className='flex gap-3 items-center w-2/3'>
                                                    <div>
                                                        <img className='w-[50px]' src={e.proimg} alt="" />
                                                    </div>
                                                    <div>
                                                        <h3 className=''>{e.proname} &nbsp;&nbsp;&nbsp; x{e.buyerqty}</h3>
                                                        <h3>Category: {e.category}</h3>
                                                    </div>
                                                </div>
                                                <div className='w-1/3 flex items-center justify-end'>
                                                    <p>$
                                                        {
                                                            e.proprice * e.buyerqty
                                                        }
                                                    </p>
                                                </div>
                                            </div>

                                        </>)

                                    })

                                }
                                <div>
                                    <div className='w-full h-20 border-b border-gray-200 flex items-center justify-center'>
                                        <div className='px-10 h-13 flex flex-col items-center justify-center'>
                                            <BsStickies />
                                            <h2>Shipping</h2>
                                        </div>
                                        <div className='border-l border-gray-200 border-r px-10 h-13 flex flex-col items-center justify-center'>
                                            <GiStickGrenade />
                                            <h2>Note</h2>
                                        </div>
                                        <div className='px-10 h-13 flex flex-col items-center justify-center'>
                                            <ImTicket />
                                            <h2>Coupon</h2>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between'>
                                    <p>SUBTOTAL</p>
                                    <p>$
                                        {

                                            cartarray.reduce((init: any, e: any) => {

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
                                    <p>${cartarray.reduce((init: any, e: any) => {

                                        return init + (e.buyerqty * e.proprice)

                                    }, 10)}</p>
                                </div>
                                <div className='w-full' >
                                    <img className='w-[80%]' src='./src/assets/Screenshot 2025-06-19 183114.png' alt="" />
                                </div>
                                <button className='px-10 h-10 border cursor-pointer' onClick={handlecheckout}>CHECKOUT</button>
                            </div>
                        </div>
                    </div>

                }
            </div>
        </div>
    )
}

export default Checkout