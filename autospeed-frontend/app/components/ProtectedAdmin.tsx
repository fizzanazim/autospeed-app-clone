'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import ProtectedRoutes from "./ProtectedRoutes"

const ProtectedAdmin = () => {

    ProtectedRoutes()

    let router = useRouter()

    useEffect(()=>{

        let storedUser:any = localStorage.getItem('user_found')
        let user:any = JSON.parse(storedUser) || {}

        if(user.role!='admin'){
    
            router.push('/')
    
        }


    }, [])
  
}

export default ProtectedAdmin