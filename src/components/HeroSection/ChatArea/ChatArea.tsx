import Image from 'next/image';
import React from 'react';
import ChatBox from './ChatBox';
import Chats from './Chats';
import { useStore } from '@/zustand/store';
import { MessageType, StoreType } from '../../../../types';




const ChatArea = () => {
  const convParti = useStore((state: StoreType) => state.convParti);
  const setParticipant = useStore((state: StoreType) => state.setConvParti);
  const user = useStore((state: StoreType) => state.user);

  // if (!convParti?.conversation?.id) {
  //   setParticipant(null)
  // }

  return (
    <div className='bg-[url("/assets/chat-bg4.webp")] flex-1 bg-cover bg-no-repeat relative flex'>
      {user && <Chats convId={convParti?.conversation?.id || ""} user={user} />}
      <ChatBox />
    </div>
  )
}

export default ChatArea