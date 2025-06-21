import React, { useState } from 'react'
import Header from '../Header/Header'
import SearchBar from '../SearchBar/SearchBar';
import { Button } from '@/components/ui/button';
import Listing from '../Listing/Listing';
import { motion, AnimatePresence } from "framer-motion";
import NewChat from './NewChat';
import SearchUser from './SearchUser';





const MainSideBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"all" | "unread" | "groups">("all");
    const [open, setOpen] = useState(false);
    const [contact, setContact] = useState(false);



    return (
        <AnimatePresence mode="wait">
            {open ? <motion.div
                key="left-panel"
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
                className="h-screen ml-16 w-[calc(525px-64px)] absolute top-0 left-0 bg-white border-r-[2px]"
            >
                {
                    !contact ? <>
                        <NewChat setOpen={setOpen} />
                        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search Mobile Number" className='mt-0' />
                        <div className='h-fit mt-2'>
                            <div className='w-full grid grid-cols-7 h-16 mx-3 hover:bg-gray-100 rounded-xl '>
                                <span className='grid col-span-1 place-content-center rounded-full bg-blue-500 m-2 text-white p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users-icon lucide-users"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><path d="M16 3.128a4 4 0 0 1 0 7.744" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><circle cx="9" cy="7" r="4" /></svg>
                                </span>
                                <p className=' col-span-2 text-start my-auto ml-3'>New group</p>
                            </div>
                            <button
                                className='w-full grid grid-cols-7 h-16 mx-3 hover:bg-gray-100 rounded-xl cursor-pointer'
                                onClick={() => setContact(true)}
                            >
                                <span className='grid col-span-1 place-content-center rounded-full bg-blue-500 m-2 text-white p-2'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-plus-icon lucide-user-plus"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><line x1="19" x2="19" y1="8" y2="14" /><line x1="22" x2="16" y1="11" y2="11" /></svg>
                                </span>
                                <p className=' col-span-2 text-start my-auto ml-3'>New contact</p>
                            </button>

                        </div>
                    </> :
                        <div className='flex flex-col h-screen'>
                            <NewChat setOpen={setContact} title={"New Contact"} />
                            <SearchUser setOpen={setOpen} setContact={setContact}/>
                        </div>
                }
            </motion.div>
                :
                <motion.div
                    key="main-panel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="col-span-7"
                >
                    {/* Header */}
                    <Header setOpen={setOpen} />
                    {/* Search */}
                    <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} placeholder="Search or start a new chat" />
                    {/* Tabs to switch */}
                    <section className='h-8 w-full mt-4  '>
                        <div className='w-1/2 flex justify-between ml-5'>
                            <Button variant="outline" className={`w-10 h-8 text-sm rounded-full border-[1px] border-gray-300 hover:bg-gray-50 font-normal ${activeTab === "all" && "border-blue-600 font-normal bg-blue-200 hover:bg-blue-200 hover:text-blue-600 text-blue-600"}`} onClick={() => setActiveTab("all")}>All</Button>
                            <Button variant="outline" className={`w-20 h-8 text-sm rounded-full border-[1px] border-gray-300 hover:bg-gray-50 font-normal ${activeTab === "unread" && "border-blue-600 font-normal bg-blue-200 hover:bg-blue-200 hover:text-blue-600 text-blue-600"}`} onClick={() => setActiveTab("unread")}>Unread</Button>
                            <Button variant="outline" className={`w-18 h-8 text-sm rounded-full border-[1px] border-gray-300 hover:bg-gray-50 font-normal ${activeTab === "groups" && "border-blue-600 font-normal bg-blue-200 hover:bg-blue-200 hover:text-blue-600 text-blue-600"}`} onClick={() => setActiveTab("groups")}>Groups</Button>
                        </div>
                    </section>

                    {/* listing section */}
                    <main className='h-[calc(100vh-150px)] mt-2 overflow-y-scroll'>
                        <Listing />
                    </main>
                </motion.div>}
        </AnimatePresence>
    )
}

export default MainSideBar