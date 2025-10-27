'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const ProtectedRoutes = () => {
    
    const router = useRouter()

    useEffect(() => {
        
        if (typeof window != "undefined") {

           let token = localStorage.getItem('token') || '';
            if (!token) {
        
                router.push('/sign-in')
                
            }
            
        }

        
    }, [])

}

export default ProtectedRoutes