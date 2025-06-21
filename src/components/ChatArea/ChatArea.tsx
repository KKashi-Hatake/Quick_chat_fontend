'use client'



import React, { useEffect, useMemo } from 'react'
import SideBar from '../Sidebar/Sidebar'
import HeroSection from '../HeroSection/HeroSection'
import { CustomSocket, getSocket } from '@/lib/socket.config'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { useStore } from '@/zustand/store'

const ChatArea = ({ user }: { user?: CustomUser }) => {

    const setUser = useStore(state => state.setUser)
    useEffect(() => {
        if (user) {
            setUser(user)
        }
    }, [user])

    let socket = useMemo(() => {
        const socket: CustomSocket = getSocket()
        return socket.connect();
    }, [])
    
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Connected to server with ID:", socket.id);
        });

        socket.on("connect_error", (err) => {
            console.error("Connection error:", err);
        });

        socket.on('message', (data: any) => {
            console.log("The socket message is", data)
        })
        return () => {
            socket.close()
        }
    }, [])


    return (
        <div className="w-full h-full grid grid-cols-3 space-x-4 overflow-y-hidden">
            {/* Sidebar */}
            <SideBar />
            {/* Hero Section */}
            <HeroSection />


        </div>
    )
}

export default ChatArea