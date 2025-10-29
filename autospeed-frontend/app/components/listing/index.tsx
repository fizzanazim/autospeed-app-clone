'use client'

import axios from 'axios'
import React, { useEffect, useState } from 'react'

// const Listing = ({data}:any, {var-name}:Number) => { //for multiple props with different datatype
const Listing = ({ data, getdata, handledisplay }: any) => {
    // const Listing = (props:any) => {

    //     const { data } = props;
    //     console.log(data, 'data');

    const [categoryobj, setCategoryobj] = useState({

        catname: '',
        catimg: ''

    })

    const [file, setFile]: any = useState(null)
    const [tempindex, settempindex]: any = useState(-1)
    const [categorytext, setcategorytext]: any = useState('')


    const [displayaddproduct, setDisplayaddproduct] = useState('hidden')
    const [displayoverlay, setDisplayoverlay] = useState('hidden')

    const handlenewcategory = () => {

        setDisplayaddproduct('block')
        setDisplayoverlay('block')
        setcategorytext('ADD CATEGORY')

    }

    const onchangehandler = (e: any) => {

        setCategoryobj({ ...categoryobj, [e.target.name]: e.target.value })

    }

    const storecategory = async (e: any) => {

        e.preventDefault()

            if(tempindex==-1){

                if (categoryobj.catname != '' && categoryobj.catimg != '') {

                    let res = await axios.post('http://localhost:2005/api/port2', categoryobj)
                    if(res.data.success){

                        setCategoryobj({
                            catname: '',
                            catimg: ''
                        })

                        setDisplayaddproduct('hidden')
                        setDisplayoverlay('hidden')

                    }
                }
                
            }
            else{
                
                let res = await axios.patch(`http://localhost:2005/api/editcategory/${tempindex}`, categoryobj)
                
                if(res.data.success){
                    
                    alert(res.data.message)
                    
                    setCategoryobj({
                        catname: '',
                        catimg: ''
                    })
                    tempindex(-1)
                    setDisplayaddproduct('hidden')
                    setDisplayoverlay('hidden')
                    
                }
            
            }
            getdata()
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

                let res = await axios.post('https://api.cloudinary.com/v1_1/drubesyba/image/upload', formData)
                setCategoryobj({ ...categoryobj, catimg: res.data.secure_url })

            }

            postImage()

        }

    }, [file])

    const editcategory = (e: any) => {

        setDisplayaddproduct('block')
        setDisplayoverlay('block')
        setCategoryobj(e)
        settempindex(e._id)
        setcategorytext('Edit Category')
        handledisplay()

    }

    const handleoverlay = ()=>{

        setDisplayaddproduct('hidden')
        setDisplayoverlay('hidden')
        handledisplay()

    }

    const delcategory = async (id:any)=>{

        let res = await axios.delete(`http://localhost:2005/api/delcategory/${id}`)
        if(res.data.success){

            alert(res.data.message)

        }
        getdata()

    }


    return (
        <div className='py-15 px-10 flex flex-col h-full gap-10'>
            <div className='flex justify-between w-full'>
                <h1 className='capitalize font-semibold text-2xl'>CATEGORIES</h1>
                <button onClick={handlenewcategory} className='px-10 h-10 border-2 border-red-500 text-red-500 cursor-pointer'>ADD NEW CATEGORY</button>
            </div>

            {/* OVERLAY */}
            <div onClick={handleoverlay} className={`${displayoverlay} w-full h-screen bg-[rgba(100,100,100,0.2)] absolute top-0 left-0`}></div>
            <div className={`${displayaddproduct} py-10 px-10 flex flex-col bg-white items-center gap-10 absolute top-1/2 left-1/2 -translate-1/2`}>
                <input onChange={onchangehandler} className='border h-10 px-2' name='catname' value={categoryobj.catname} type="text" placeholder='Enter Category Name' />
                <input onChange={onchangeimage} id='images' type="file" />
                <button onClick={storecategory} className='border h-10 px-10 cursor-pointer'>{categorytext}</button>
            </div>

            <div className='w-full'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <td className='w-1/4'>Image</td>
                            <td className='w-1/4'>CATEGORY NAME</td>
                            {data[0]?.proprice && <td className='w-1/4'>PRICE</td>}
                            <td className='w-1/4'>ACTION</td>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            data && data.map((e: any, i:any) => (

                                <tr className='h-15'>
                                    <td><img className='w-10' src={e.catimg} alt="" /></td>
                                    <td>{e.catname}</td>
                                    <td>
                                        <div className="flex gap-3">
                                            <button onClick={() => editcategory(e)} className='cursor-pointer text-blue-900 capitalize'>edit</button>
                                            <button onClick={()=>{delcategory(e._id)}} className='cursor-pointer text-red-500 capitalize'>delete</button>
                                        </div>
                                    </td>
                                </tr>

                            ))

                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Listing