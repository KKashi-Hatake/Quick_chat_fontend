'use client'
import React, { useState } from 'react'
import SubSideBar from './SubSideBar/SubSideBar'
import MainSideBar from './MainSideBar/MainSideBar';

const SideBar = () => {
  return (
    <div className='h-screen w-[400px] lg:w-fit col-span-1 grid grid-cols-8'>
      <SubSideBar />
      {/* main side bar */}
      <MainSideBar />




    </div>
  )
}

export default SideBar