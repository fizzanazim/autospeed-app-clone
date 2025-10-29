'use client'

import Adminsidebar from '@/app/components/adminsidebar'
import Navbar from '@/app/components/navbar'
import ProtectedAdmin from '@/app/components/ProtectedAdmin'
import ProtectedRoutes from '@/app/components/ProtectedRoutes'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Orders = () => {

    ProtectedRoutes()
    ProtectedAdmin()

    const [order_info, setOrder_info]: any = useState(null)
    const [indextoupdate, setindextoupdate] = useState(-1)
    const [orderstatus, setOrderstatus]: any = useState({

        orderId: '',
        order_status: ''

    })

    useEffect(() => {

        getdata()

    }, [])

    const getdata = async () => {

        let res = await axios.get('http://localhost:2005/api/get-orders')
        if (res.data.success) {

            setOrder_info(res.data.orders)

        }

    }

    const handleorderstatus = (e: any, buyer: any, i: Number) => {
        // Optionally, update order status for a specific order
        setOrderstatus({
            orderId: buyer.order_id,
            order_status: e.target.value
        });
    }

    useEffect(() => {

        const updateorderstatus = async () => {

            let res = await axios.patch('http://localhost:2005/api/update-order-status', orderstatus);
            res.data.success && getdata()
            console.log('this function running');

        };

        updateorderstatus()

    }, [orderstatus]);


    return (
        <div className='w-full min-h-screen flex flex-col'>
            <Navbar />
            <div className='flex flex-1'>
                <Adminsidebar sideoption={"order"} />
                <div className='w-[82%] p-13'>
                    {order_info && order_info.map((ele: any, i: any) => (
                        <div key={i} className='flex justify-between p-5 border'>
                            <div className='flex flex-col gap-3 w-1/2 px-10'>
                                <h2 className='font-semibold '>Order ID:</h2>
                                <h2 className='w-4/5 break-words'>{ele.order_id}</h2>
                                <h2><span className='font-semibold'>Name:</span> {ele.firstname}</h2>
                                <h2><span className='font-semibold'>Phone:</span> {ele.phone}</h2>
                                <h2><span className='font-semibold'>Email:</span> {ele.email}</h2>
                                <h2><span className='font-semibold'>Payment Status:</span> {ele.payment_status}</h2>
                                <div className='bg-red-200 w-1/3 px-3 h-10 flex items-center justify-center'>{ele.order_status}</div>
                                <select className='h-10 border px-2 w-1/2'
                                    name=""
                                    id="orderstatus"
                                    // value={ele.order_status}
                                    onChange={(e) => handleorderstatus(e, ele, i)}
                                >
                                    <option selected={ele.order_status == 'Payment Pending'} value="Payment Pending">Payment Pending</option>
                                    <option selected={ele.order_status == 'Processing'} value="Processing">Processing</option>
                                    <option selected={ele.order_status == 'Completed'} value="Completed">Completed</option>
                                    <option selected={ele.order_status == 'Cancelled'} value="Cancelled">Cancelled</option>
                                </select>
                            </div>
                            <div className='w-1/2 flex flex-col px-10 gap-3'>
                                {ele.products && ele.products.map((ele: any, id: any) => (
                                    <div>
                                        <h2 className='flex items-center gap-3 rounded'>
                                            Product Name: {ele.proname}
                                            <img className='h-10' src={ele.proimg} alt="" />
                                        </h2>
                                        <h2>Price: {ele.proprice}</h2>
                                        <h2>Category: {ele.category}</h2>
                                        <h2>Quantity: {ele.buyerqty}</h2>
                                    </div>

                                ))}
                                <h2>Total Price: {ele.totalprice}</h2>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Orders
