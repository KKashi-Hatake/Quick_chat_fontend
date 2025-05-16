import Image from 'next/image';
import React from 'react';
import ChatBox from './ChatBox';




const ChatArea = () => {
  return (
    <div className='bg-[url("/assets/chat-bg4.webp")] bg-cover bg-no-repeat h-full w-full relative'>

      <ChatBox />
    </div>
  )
}

export default ChatArea