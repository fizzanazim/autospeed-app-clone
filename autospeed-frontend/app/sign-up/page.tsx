'use client'

import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { SiAxios } from 'react-icons/si';
import { TbBrandYahoo } from "react-icons/tb";


const Signup = () => {

    const [message, setMessage] = useState('')
    const naviagte = useRouter()

    const [obj, setObj] = useState({
        firstname: "",
        lastname: "",
        username: '',
        email: "",
        password: '',
    })

    const getValue = (e:any) => {

       setObj(
        {...obj, [e.target.name]: e.target.value}
       )

    }

    const signupform = (e:any) => {

        e.preventDefault()
        console.log(obj.password.length);
        
        if (obj.firstname == '' || obj.firstname.length <= 2) {

            setMessage('First name can\'t be empty or less than 2 words')
            return

        }
        else if (obj.lastname == '' || obj.lastname.length <= 2) {

            setMessage('Last name can\'t be empty or less than 2 words')
            return

        }
        else if (obj.username == '' || obj.username.length <= 7) {

            setMessage('User name can\'t be empty or less than 7 words')
            return

        }
        else if (obj.email == '') {

            setMessage('Email can\'t be empty or less than 7 words')
            return

        }
        else if (obj.password == '' || obj.password.length < 5) {

            setMessage('Password can\'t be empty or less than 5 words')
            return

        }
        else {
           
            postdata()
            
        }
        
    }
    
    const postdata = async()=>{

        
        let res = await axios.post('http://localhost:2005/api/post-login-info', obj)
        console.log(res.data);
        
        if(res.data.message == "successful"){
            
            naviagte.push("/sign-in")

        }
        else if(res.data.message == "user already existing"){

            console.log("else");
            
            setMessage(res.data.message)

            setTimeout(() => {

                setMessage('')
                
            }, 4000);
            
        }
        
    }

    return (
        <div className="w-full h-screen">
            <div className="w-[400px] absolute top-1/2 left-1/2 transform -translate-1/2 h-120 bg-[#F7F7F7] rounded-md flex flex-col px-4 items-center justify-center gap-5">
                <img src="https://opencart.dostguru.com/AS01/autospeed_01/image/catalog/logo.png" className='h-10' alt="" />
                <form onSubmit={signupform} className="flex flex-col items-center justify-center gap-2 w-full" action="">
                    <input onChange={getValue} value={obj.firstname} name="firstname" type="text" placeholder="First Name" className="w-full placeholder-gray-500 px-3 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                    <input onChange={getValue} value={obj.lastname} name="lastname" type="text" placeholder="Last Name" className="w-full px-3 placeholder-gray-500 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                    <input onChange={getValue} value={obj.username} name="username" type="text" placeholder="Username" className="w-full px-3 placeholder-gray-500 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                    <input onChange={getValue} value={obj.email} name="email" type="email" placeholder="Email" className="w-full px-3 placeholder-gray-500 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                    <input onChange={getValue} value={obj.password} name="password" type="password" placeholder="Set password" className="w-full px-3 placeholder-gray-500 outline-transparent border-3 border-gray-200 rounded-md h-12" />
                    <p className="text-red-600">{message}</p>
                    <button type="submit" className="bg-red-500 text-white w-20 h-10">Sign Up</button>
                </form>
                <Link className="text-[14px] text-red-500" href={"/sign-in"}>Sign In</Link>
            </div>
        </div>
    )
}

export default Signup