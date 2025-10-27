'use client'

import Navbar from '@/app/components/navbar'
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { CiHome } from "react-icons/ci";
import Sidebar from '@/app/components/Sidebar';
import ProtectedRoutes from '@/app/components/ProtectedRoutes';
import ProductDisplay from '@/app/components/productdisplay';
import { useDispatch, useSelector } from 'react-redux';
import { SetSidebarDisplay } from '@/app/Redux/Actions';
import Footer from '@/app/components/footer';

const SingleProduct = () => {

    ProtectedRoutes()

    const [obj, setobj]: any = useState({})
    const dispatch = useDispatch()
    const {sidebardisplay} = useSelector((state:any)=>state.addtocartreducer)
    const [screendisplay, setscreendisplay] = useState('overflow-scroll')
 
    let { id } = useParams()

    useEffect(() => {

        getdata()

    }, [])

    const getdata = async () => {

        let res = await axios.get(`http://localhost:2005/api/for-finding-object/${id}`)
        setobj({ ...res.data, buyerqty: 0 });

    }
    const handlesidebar = () => {

        dispatch(SetSidebarDisplay())

    }

    return (
        <div>
            <Navbar/>
            <div onClick={handlesidebar} className={`${sidebardisplay} w-full h-screen bg-[rgba(100,100,100,0.3)] absolute top-0 left-0`}></div>
            <div className={`${sidebardisplay} w-[30%] h-screen absolute top-0 right-0`}>
                <Sidebar />
            </div>
            <div className='px-20 py-5'>
                <div className='bg-gray-300 flex items-center w-full h-10 px-3'>
                    <p className='flex items-center'><CiHome className='px-2 w-8 border-r-2 mr-2' />{obj.proname}</p>
                </div>
                <ProductDisplay obj = {obj} />
            </div>
            <Footer/>
        </div>
    )
}

export default SingleProduct