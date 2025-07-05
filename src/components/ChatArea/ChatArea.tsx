'use client'



import React, { useEffect, useMemo, useState } from 'react'
import SideBar from '../Sidebar/Sidebar'
import HeroSection from '../HeroSection/HeroSection'
import { CustomSocket, getSocket } from '@/lib/socket.config'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { useStore } from '@/zustand/store'
import { getConversations } from '@/utils/apis/searchUser'
import { User } from '../../../types'
import SubSideBar from '../Sidebar/SubSideBar/SubSideBar'
import MainSideBar from '../Sidebar/MainSideBar/MainSideBar'

const ChatArea = ({ user }: { user: CustomUser }) => {
    const setUser = useStore(state => state.setUser);
    const setConversations = useStore(state => state.setConversations)
    const [convTrigger, setConvTrigger] = useState(false);
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
    }, [convTrigger])

    let socket = useMemo(() => {
        const socket: CustomSocket = getSocket(user.id)
        return socket.connect();
    }, [])

    useEffect(() => {
        const message = (data: any) => {
            console.log("The socket message is", data)
        }
        const newMessage = (data: any) => {
            console.log("The socket message is", data)
        }
        const newConv = (data: any) => {
            setConvTrigger(!convTrigger);
            console.log("new conversation triggered", data)
        }





        socket.on('message', message)
        socket.on('newMessage', newMessage);
        socket.on('newConv', newConv);




        return () => {
            socket.close()
        }
    }, [])


    return (
        <div className="w-[748px] md:w-full h-full flex">
            {/* Sidebar */}
            {/* <SideBar /> */}
            <SubSideBar />
            {/* main side bar */}
            <MainSideBar />



            {/* Hero Section */}
            <HeroSection />


        </div>
    )
}

export default ChatArea