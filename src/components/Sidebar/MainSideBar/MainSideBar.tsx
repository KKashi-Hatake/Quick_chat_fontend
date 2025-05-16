import React, { useState } from 'react'
import Header from '../Header/Header'
import SearchBar from '../SearchBar/SearchBar';
import { Button } from '@/components/ui/button';
import Listing from '../Listing/Listing';





const MainSideBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"all" | "unread" | "groups">("all");




    return (
        <div className='col-span-7'>
            {/* Header */}
            <Header />
            {/* Search */}
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {/* Tabs to switch */}
            <section className='h-8 w-full mt-4  '>
                <div className='w-1/2 flex justify-between ml-5'>
                    <Button variant="outline" className={`w-10 h-8 text-sm rounded-full border-[1px] border-gray-300 hover:bg-gray-50 font-normal ${activeTab==="all" && "border-blue-600 font-normal bg-blue-200 hover:bg-blue-200 hover:text-blue-600 text-blue-600"}`} onClick={() => setActiveTab("all")}>All</Button>
                    <Button variant="outline" className={`w-20 h-8 text-sm rounded-full border-[1px] border-gray-300 hover:bg-gray-50 font-normal ${activeTab==="unread" && "border-blue-600 font-normal bg-blue-200 hover:bg-blue-200 hover:text-blue-600 text-blue-600"}`} onClick={() => setActiveTab("unread")}>Unread</Button>
                    <Button variant="outline" className={`w-18 h-8 text-sm rounded-full border-[1px] border-gray-300 hover:bg-gray-50 font-normal ${activeTab==="groups" && "border-blue-600 font-normal bg-blue-200 hover:bg-blue-200 hover:text-blue-600 text-blue-600"}`} onClick={() => setActiveTab("groups")}>Groups</Button>
                </div>
            </section>

            {/* listing section */}
            <main className='h-[calc(100vh-150px)] mt-2 overflow-y-scroll'>
                <Listing />
            </main>


        </div>
    )
}

export default MainSideBar