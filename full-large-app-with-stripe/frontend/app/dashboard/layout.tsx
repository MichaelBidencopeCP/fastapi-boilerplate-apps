'use client'

import { useEffect } from "react";
import DashboardNav from "../components/dashboardNav";
import useUserStore from "../lib/user-store";
import { useRouter } from "next/navigation";


export default function Layout({ children }: { children: React.ReactNode }) {

    const user = useUserStore((state)=>state)
    const router = useRouter()
    useEffect(()=>{
        if(user.userId === null){
            router.push('/')
        }

    },[user])

    return (
        <div className="flex overflow-clip">
            {/* Sidebar */}
            <div className="w-64 ">
                <DashboardNav />
            </div>
            
            {/* Main Content */}
            <div className="h-screen w-full bg-white text-black">
                {children}
            </div>
        </div>
    )
}