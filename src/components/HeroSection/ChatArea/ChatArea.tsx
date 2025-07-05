import Image from 'next/image';
import React from 'react';
import ChatBox from './ChatBox';
import Chats from './Chats';
import { useStore } from '@/zustand/store';
import { MessageType, StoreType } from '../../../../types';




const ChatArea = () => {
  const convParti = useStore((state: StoreType) => state.convParti);
  console.log(convParti)
  return (
    <div className='bg-[url("/assets/chat-bg4.webp")] bg-cover bg-no-repeat relative'>
      <Chats messages={convParti?.conversation?.messages as MessageType[]} />
      <ChatBox />
    </div>
  )
}

export default ChatArea