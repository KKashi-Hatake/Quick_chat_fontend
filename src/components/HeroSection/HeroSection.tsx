import React from 'react'
import Navbar from './Navbar/Navbar'
import ChatArea from './ChatArea/ChatArea'

const HeroSection = () => {
  return (
    <div className='col-span-2'>
        {/* Navbar */}
        <Navbar />
        {/* Chat Area */}
        <ChatArea />

    </div>
  )
}

export default HeroSection