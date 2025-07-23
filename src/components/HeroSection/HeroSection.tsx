import React, { useEffect, useState } from 'react'
import Navbar from './Navbar/Navbar'
import ChatArea from './ChatArea/ChatArea'
import { MessageCircle, Search, MoreVertical, Users, MessageSquare, Zap } from "lucide-react"
import { useStore } from '@/zustand/store';
import { ConversationParticipantType, StoreType } from '../../../types';

const HeroSection = () => {
  const convParti = useStore((state: StoreType) => state.convParti);


  return (
    convParti ? <div className='h-screen w-[calc(100vw-45%-64px)]  md:w-[calc(100vw-40%-64px)] xl:w-[calc(100vw-30%-64px)] flex flex-col border'>
      {/* Navbar */}
      <Navbar image={convParti?.image || null} firstName={convParti?.first_name} lastName={convParti?.last_name} />
      {/* Chat Area */}
      <ChatArea />
    </div> :
      <div className=" h-screen flex-1 flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Right Panel - Welcome Screen with Cool Image */}
        <div className="text-center">
          {/* Cool Chat Illustration */}
          <div className="relative mb-8">
            <div className="w-64 h-64 mx-auto relative">
              {/* Main chat bubble */}
              <div className="absolute top-8 left-8 w-32 h-20 bg-blue-500 rounded-2xl rounded-bl-sm shadow-lg transform rotate-3">
                <div className="flex items-center justify-center h-full">
                  <div className="space-y-1">
                    <div className="w-16 h-2 bg-white/80 rounded"></div>
                    <div className="w-12 h-2 bg-white/60 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Response bubble */}
              <div className="absolute top-16 right-8 w-28 h-16 bg-gray-300 rounded-2xl rounded-br-sm shadow-lg transform -rotate-2">
                <div className="flex items-center justify-center h-full">
                  <div className="space-y-1">
                    <div className="w-14 h-2 bg-gray-600 rounded"></div>
                    <div className="w-10 h-2 bg-gray-500 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Another chat bubble */}
              <div className="absolute bottom-16 left-12 w-36 h-18 bg-green-500 rounded-2xl rounded-bl-sm shadow-lg transform rotate-1">
                <div className="flex items-center justify-center h-full">
                  <div className="space-y-1">
                    <div className="w-20 h-2 bg-white/80 rounded"></div>
                    <div className="w-16 h-2 bg-white/60 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-4 right-4 w-8 h-8 bg-yellow-400 rounded-full shadow-md animate-bounce">
                <div className="flex items-center justify-center h-full">
                  <Zap className="h-4 w-4 text-yellow-800" />
                </div>
              </div>

              <div className="absolute bottom-4 right-16 w-6 h-6 bg-pink-400 rounded-full shadow-md animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </div>

              <div className="absolute top-20 left-2 w-10 h-10 bg-purple-400 rounded-full shadow-md animate-pulse">
                <div className="flex items-center justify-center h-full">
                  <MessageCircle className="h-5 w-5 text-white" />
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Text */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Quick Chat</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            Start meaningful conversations with friends, family, and colleagues. Select a chat from the sidebar or
            search for someone new to begin messaging.
          </p>

          {/* Feature highlights */}
          <div className="flex justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              <span>Instant messaging</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Group chats</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4" />
              <span>Real-time sync</span>
            </div>
          </div>
        </div>
      </div>
  )
}

export default HeroSection