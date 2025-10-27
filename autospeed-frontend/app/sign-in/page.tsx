'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { TbBrandYahoo } from "react-icons/tb";

const Signin = () => {

    const [userdata, setUserdata]:any = useState({

        usernameemail: '',
        password: ''


    })

    const navigate = useRouter()

    const [message, setMessage] = useState('')

    const getuserdata = (e:any) => {

        setUserdata({...userdata, [e.target.name]: e.target.value })

    }

    const checksignin = (e:any) => {

        e.preventDefault()

        if (userdata.usernameemail == '') {

            setMessage('username or email field can\'t be empty')
            setTimeout(() => {

                setMessage('')

            }, 2000)
            return

        }
        else if (userdata.password == '') {

            setMessage('password field can\'t be empty')
            setTimeout(() => {

                setMessage('')

            }, 2000)
            return

        }
    
        verifylogin()

    }

    const verifylogin = async()=>{

        let res = await axios.post('http://localhost:2005/api/verify-user-login', userdata)
        console.log(res.data);

        if(res.data.success){

            localStorage.setItem('token', res.data.token)
            localStorage.setItem('user_found', JSON.stringify(res.data.user_found))

            setTimeout(() => {

                navigate.push('/')

            }, 100);

        }
        else{

            alert(res.data.message)

        }
        
    }

    return (
    
    <div className="w-full h-screen">
        <div className="w-[400px] absolute top-1/2 left-1/2 transform -translate-1/2 h-120 bg-[#F7F7F7] rounded-md flex flex-col px-4 items-center justify-center gap-5">
            <img src="https://opencart.dostguru.com/AS01/autospeed_01/image/catalog/logo.png" className='h-10' alt="" />
            <form onSubmit={checksignin} className="flex flex-col items-center justify-center gap-4 w-full" action="">
                <input type="text" onChange={getuserdata} value={userdata.usernameemail} name="usernameemail" placeholder="Username or email" className="w-full px-3 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                <input type="password" onChange={getuserdata} value={userdata.password} name="password" placeholder="password" className="w-full px-3 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                {/* <p className='text-red-500 self-end'><Link href={'/Pages/forgot-password'}>Forgot Password?</Link></p> */}
                <button className="bg-red-500 text-white w-20 h-10 cursor-pointer">Sign In</button>
            </form>
            <p className="text-red-500 text-[12px]">{message}</p>
            <div className='flex flex-col items-center justify-center'>
                <p>Don't have an account? <Link href={"sign-up"}><span className="text-red-500 cursor-pointer">Sign up</span></Link></p>
                <p><Link href={"/"}><span className="cursor-pointer text-red-500">Home</span></Link></p>
            </div>
        </div>
    </div>)

}

export default Signin