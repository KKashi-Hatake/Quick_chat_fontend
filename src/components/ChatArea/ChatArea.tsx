'use client'



import React, { useEffect, useMemo } from 'react'
import SideBar from '../Sidebar/Sidebar'
import HeroSection from '../HeroSection/HeroSection'
import { CustomSocket, getSocket } from '@/lib/socket.config'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { useStore } from '@/zustand/store'
import { getConversations } from '@/utils/apis/searchUser'
import { User } from '../../../types'

const ChatArea = ({ user }: { user?: CustomUser }) => {
    const setUser = useStore(state => state.setUser);
    const setConversations = useStore(state => state.setConversations)
    useEffect(() => {
        if (user) {
            setUser((prev: User | null) => {
                if (JSON.stringify(prev) !== JSON.stringify(user)) {
                    return user;
                }
                return prev;
            });
        }
    }, [user]);

    useEffect(() => {
        const getConv = async () => {
            const res = await getConversations();
            setConversations(res);
        }
        getConv();
    }, [])

    let socket = useMemo(() => {
        const socket: CustomSocket = getSocket()
        return socket.connect();
    }, [])

    useEffect(() => {

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