'use client'

import { getSocket } from '@/lib/socket.config'
import React, { useEffect, useMemo, useState } from 'react'
import { v4 as uuidv4 } from "uuid"
import { CustomSocket } from '@/lib/socket.config'
import ChatSidebar from './ChatSidebar'
import ChatNav from './ChatNav'
import ChatUserDialog from './ChatUserDialog'
import Chats from './Chats'


const ChatBase = ({ group, users, oldMessages }: { group: ChatGroupType, users: Array<GroupChatUserType> | [], oldMessages:Array<MessageType> | [] }) => {
    console.log(group)
    let socket = useMemo(() => {
        const socket: CustomSocket = getSocket()
        socket.auth ={
            room: group.id
        };
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


    const handleClick = () => {
        socket.emit("message", { name: "Shashank", id: uuidv4() })
    }
    const [open, setOpen] = useState(true);
    const [chatUser, setChatUser] = useState<GroupChatUserType>()
    useEffect(()=>{
        const data = localStorage.getItem(group.id);
        if(data){
            const pData = JSON.parse(data);
            setChatUser(pData);
        }
    },[])

    return (
        <div className='flex'>
            <ChatSidebar users={users} />
            <div className='w-full md:w-4/5 bg-gradient-to-b from-gray-50 to-white'>
                {open ? <ChatUserDialog open={open} setOpen={setOpen} group={group} /> : <ChatNav chatGroup={group} users={users} />}
            <Chats group={group} chatUser = {chatUser} oldMessages={oldMessages}    />
            </div>
        </div>
    )
}

export default ChatBase