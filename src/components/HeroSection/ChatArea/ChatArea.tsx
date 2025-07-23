import Image from 'next/image';
import React from 'react';
import ChatBox from './ChatBox';
import Chats from './Chats';
import { useStore } from '@/zustand/store';
import { MessageType, StoreType } from '../../../../types';




const ChatArea = () => {

  const user = useStore((state: StoreType) => state.user);

  return (
    <div className='bg-[url("/assets/bg.png")] flex-1 bg-cover bg-no-repeat relative flex'>
      {user && <Chats user={user} />}
      <ChatBox />
    </div>
  )
}

export default ChatArea