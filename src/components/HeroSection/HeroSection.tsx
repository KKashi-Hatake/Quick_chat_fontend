import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import ChatArea from './ChatArea/ChatArea'
import { useStore } from '@/zustand/store';
import { ConversationParticipantType, StoreType } from '../../../types';

const HeroSection = () => {
  const convParti = useStore((state: StoreType) => state.convParti);
  const [participant, setParticipant] = useState<ConversationParticipantType | null>(null)

  useEffect(() => {
    if (convParti) {
      setParticipant(convParti);
    }
  }, [convParti])

  return (
    <div className='col-span-2'>
      {/* Navbar */}
      <Navbar image={participant?.image || null} firstName={participant?.first_name} lastName={participant?.last_name} />
      {/* Chat Area */}
      <ChatArea />

    </div>
  )
}

export default HeroSection