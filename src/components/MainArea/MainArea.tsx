'use client'



import React, { useEffect, useMemo, useRef, useState } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import { getSocket } from '@/lib/socket.config'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { useStore } from '@/zustand/store'
import { getConversations } from '@/utils/apis/searchUser'
import SubSideBar from '../Sidebar/SubSideBar/SubSideBar'
import MainSideBar from '../Sidebar/MainSideBar/MainSideBar'
import { Socket } from 'socket.io-client'
import ackListener from '@/utils/socketListeners/ackListner'

const MainArea = ({ user }: { user: CustomUser }) => {
    const setUser = useStore(state => state.setUser);
    const prevUser = useStore(state => state.user);
    const setSocket = useStore(state => state.setSocket);
    const convParti = useStore(state => state.convParti);
    const socketRef = useRef<Socket | null>(null);
    const setConversation = useStore((state) => state.setConversations);
    const conversation = useStore((state) => state.conversations);
    const message = useStore(state => state.message);
    const setMessage = useStore(state => state.setMessage)
    const messageIds = useStore(state => state.messageIds);
    const setMessageIds = useStore(state => state.setMessageIds)
    const [convTrigger, setConvTrigger] = useState(false);



    useEffect(() => {
        if (user) {
            if (JSON.stringify(prevUser) !== JSON.stringify(user)) {
                setUser(user);
            } else {
                setUser(prevUser);
            }
        }
    }, [user]);

    useEffect(() => {
        const getConv = async () => {
            const res = await getConversations();
            setConversation(res);
        }
        getConv();
    }, [convTrigger])

    useEffect(() => {
        if (!user?.id) return;

        const socket = getSocket(user.id);
        socketRef.current = socket;
        setSocket(socket);

        const newMessage = (data: any) => {
            console.log("new message triggered", data)
        }
        const newConv = (data: any) => {
            setConvTrigger(!convTrigger);
            console.log("new conversation triggered", data)
        }


        socket.on('newMessage', newMessage);
        socket.on('newConv', newConv);


        return () => {
            socket?.off("newMessage")
            socket?.off("newConv")
            socket.close()
        }
    }, [user.id]);


    return (
        <div className="w-[748px] md:w-full h-full flex">
            {/* SubSidebar */}
            <SubSideBar />
            {/* main side bar */}
            <MainSideBar />



            {/* Hero Section */}
            <HeroSection />


        </div>
    )
}

export default MainArea