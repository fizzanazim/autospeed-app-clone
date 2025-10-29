'use client'

import Adminsidebar from '@/app/components/adminsidebar'
import Navbar from '@/app/components/navbar'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { CiHome } from "react-icons/ci";
import { CiHeart } from "react-icons/ci";
import { TiShoppingCart } from "react-icons/ti";
import { VscSettings } from "react-icons/vsc";
import { CiStar } from "react-icons/ci";
import ProtectedRoutes from '@/app/components/ProtectedRoutes'
import ProtectedAdmin from '@/app/components/ProtectedAdmin'

const Products = () => {

  // ProtectedRoutes()
  // ProtectedAdmin()

  const [productobj, setProductobj] = useState({

    proname: '',
    proimg: '',
    proqty: '',
    prorating: '',
    proprice: '',
    category: ''

  })

  const [catarr, setcatarr]: any = useState(null)
  const [proarr, setproarr]: any = useState(null)
  const [showproduct, setshowproduct]: any = useState('')
  const [displayviewproduct, setDisplayviewproduct]: any = useState('hidden')
  const [displayaddproduct, setDisplayaddproduct]: any = useState('hidden')
  const [activeindex, setactiveindex]: any = useState(-1)
  const [screensize, setscreensize]: any = useState('min-h-screen')

  const [token, setToken]: any = useState(null)

  useEffect(() => {

    setToken(localStorage.getItem('token') || null)

  }, [])

  const [file, setFile]: any = useState(null) //for cloudinary image

  const storecategory = async (e: any) => {

    e.preventDefault()

    if (activeindex == -1) {

      if (productobj.proname != '' && productobj.proimg != '' && productobj.proqty != '' && productobj.prorating && productobj.proprice != '') {

        let res = await axios.post('http://localhost:2005/api/products-data', productobj)
        if (res.data.success) {

          alert(res.data.message)
          getproductdata()
          setProductobj({
            proname: '',
            proimg: '',
            proqty: '',
            prorating: '',
            proprice: '',
            category: ''
          })
        }

      }

    }
    else {

      let res = await axios.patch(`http://localhost:2005/api/update-product/${activeindex}`, productobj)

      if (res.data.success) {

        alert(res.data.message)
        getproductdata()
        setProductobj({
          proname: '',
          proimg: '',
          proqty: '',
          prorating: '',
          proprice: '',
          category: ''
        })

        setactiveindex(-1)

      }

    }

  }

  useEffect(() => {

    getdata()
    getproductdata()


  }, [])

  const getdata = async () => {

    let res = await axios.get('http://localhost:2005/api/port1')
    setcatarr(res.data.categories)

  }

  const getproductdata = async () => {

    let res = await axios.get('http://localhost:2005/api/products-array')
    setproarr(res.data.products)

  }


  const onchangehandler = (e: any) => {

    setProductobj({ ...productobj, [e.target.name]: e.target.value })

  }

  const selecthandler = (e: any) => {

    setProductobj({ ...productobj, category: e.target.value })

  }

  const viewproduct = (i: any) => {

    setDisplayviewproduct('block')
    setshowproduct(proarr[i])
    setscreensize('h-screen overflow-hidden')

  }

  const closeoverlay = () => {

    setDisplayviewproduct('hidden')
    setscreensize('min-h-screen')

  }

  const addnewproduct = () => {

    setDisplayaddproduct('block')
    setscreensize('h-screen overflow-hidden')

  }

  const editproduct = (e: any) => {

    setProductobj(e)
    setactiveindex(e._id)
    setDisplayaddproduct('block')
    setscreensize('h-screen overflow-hidden')

  }

  const delproduct = async (id: any) => {

    let res = await axios.delete(`http://localhost:2005/api/del-product/${id}`)

    if (res.data.success) {

      alert(res.data.message)
      getproductdata()

    }


  }

  const closeaddproductlayover = () => {

    setDisplayaddproduct('hidden')
    setscreensize('min-h-screen')
    setProductobj({
      proname: '',
      proimg: '',
      proqty: '',
      prorating: '',
      proprice: '',
      category: ''
    })


  }

  const onchangeimage = (e: any) => {

    console.log(e.target.files);
    setFile(e.target.files[0])

  }

  useEffect(() => {

    if (file) {

      const postImage = async () => {

        var formData = new FormData()
        formData.append('file', file) //'file' is a key name, must remain the same
        formData.append('upload_preset', 'sample-images')

        let res = await axios.post('https://api.cloudinary.com/v1_1/drubesyba/image/upload', formData,)
        setProductobj({ ...productobj, proimg: res.data.secure_url })

      }

      postImage()

    }

  }, [file])

  return (

    <div className={`${screensize} w-full relative`}>
      <Navbar />
      <div className='flex flex-1'>
        <Adminsidebar sideoption={"products"} />
        <div className='w-[82%] py-15 px-10 flex flex-col h-full gap-10'>
          <div className='flex justify-between items-center'>
            <h1 className='uppercase text-2xl font-semibold'>products</h1>
            <button onClick={addnewproduct} className='border px-3 h-10 cursor-pointer border-2 border-red-500 text-red-500'>Add New Product</button>
          </div>
          <div className='w-full'>
            <table className='w-full'>
              <thead>
                <tr className='font-semibold'>
                  <td className='w-1/4'>Image</td>
                  <td className='w-1/4'>PRODUCT NAME</td>
                  <td className='w-1/4'>PRICE</td>
                  <td className='w-1/4'>ACTION</td>
                </tr>
              </thead>
              <tbody>
                {

                  proarr && proarr.map((e: any, i: any) => (

                    <tr className='h-15'>
                      <td><img className='w-10' src={e.proimg} alt="" /></td>
                      <td>{e.proname}</td>
                      <td>$ {Number(e.proprice).toFixed(2)}</td>
                      <td>
                        <div className="flex gap-3">
                          <button onClick={() => viewproduct(i)} className='cursor-pointer capitalize text-blue-500'>view</button>
                          <button onClick={() => editproduct(e)} className='cursor-pointer capitalize text-blue-900'>edit</button>
                          <button onClick={() => delproduct(e._id)} className='cursor-pointer capitalize text-red-500'>delete</button>
                        </div>
                      </td>
                    </tr>


                  ))

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* -----VIEW PRODUCTS OVERLAY------ */}
      <div onClick={closeoverlay} className={`${displayviewproduct} absolute h-screen w-full bg-[rgba(100,100,100,0.3)] top-0`}></div>
      <div className={`${displayviewproduct} w-[50%] p-6 bg-white rounded absolute top-1/2 left-1/2 -translate-1/2`}>
        <div className=' py-5'>
          <div className='bg-gray-300 flex items-center w-full h-10 '>
            <p className='flex items-center'><CiHome className='px-2 w-8 border-r-2 mr-2' />{showproduct?.proname}</p>
          </div>
          <div className='flex w-full mt-6 gap-8'>
            <div className='w-120 p-5 border border-gray-500 rounded'>
              <img className='w-full' src={showproduct?.proimg} alt="" />
            </div>
            <div className='flex flex-1 flex-col'>
              <h2 className='text-2xl content-center font-bold h-14'>{showproduct?.proname}</h2>
              <div className='h-14 w-full border-y border-gray-300 flex items-center mt-3'>
                <p className='flex border-r border-gray-300 px-5'><CiStar /><CiStar /><CiStar /><CiStar /><CiStar /></p>
                <p className='px-5 border-r border-gray-300'>0 reviews</p>
                <p className='px-5 text-sm'>Write a Review</p>
              </div>
              <div className='h-25 border-b border-gray-300 gap-1 flex justify-center flex-col'>
                <h2 className=' text-3xl font-semibold'>${Number(showproduct?.proprice).toFixed(2)}</h2>
                <h2>Ex Tax: $100.00</h2>
              </div>
              <div className='flex flex-col h-40 justify-center gap-2'>
                <h2>Brand:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apple</h2>
                <h2>Product Code:&nbsp;&nbsp;&nbsp;{showproduct?._id}</h2>
                <div className='flex'>Availability:&nbsp; &nbsp;&nbsp;
                  <div className='px-4 rounded-md flex items-center justify-center'>In-stock</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* -----ADD NEW PRODUCT OVERLAY------ */}
      <div onClick={closeaddproductlayover} className={`${displayaddproduct} absolute h-screen w-full bg-[rgba(100,100,100,0.3)] top-0`}></div>
      <div className={`${displayaddproduct} w-[35%] py-6 px-8 bg-white rounded absolute top-1/2 left-1/2 -translate-1/2 absolute`}>
        <form onSubmit={storecategory} className='w-full flex flex-col gap-4 justify-center' action="">
          <input onChange={onchangehandler} value={productobj.proname} name='proname' className='border h-14 px-3 w-full rounded' type="text" placeholder='Product Name' />
          {/* <input onChange={onchangehandler} value={productobj.proimg} name='proimg' className='border h-14 px-3 w-full rounded'  type="text" placeholder='Product Image' /> */}
          <input onChange={onchangeimage} className='border px-3 w-full rounded' type="file" />
          <input onChange={onchangehandler} value={productobj.proprice} name='proprice' className='border h-14 px-3 w-full rounded' type="text" placeholder='Product Price' />
          <input onChange={onchangehandler} value={productobj.proqty} name='proqty' className='border h-14 px-3 w-full rounded' type="text" placeholder='Product Quantity' />
          <input onChange={onchangehandler} value={productobj.prorating} name='prorating' className='border h-14 px-3 w-full rounded' type="text" placeholder='Product Rating' />
          <select onChange={selecthandler} className='border h-12 w-30' name="" id="">
            {

              catarr && catarr.map((e: any, i: any) => (

                <option className='w-30 h-15 text-black capitalize' selected={productobj.category === e.catname} value={e.catname}>{e.catname}</option>

              ))

            }
          </select>
          <button className='cursor-pointer text-xl border px-3 h-12 w-40 rounded'>Add</button>
        </form>
      </div>
    </div>
  )
}

export default Products