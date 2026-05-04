import { MessageSquareText } from 'lucide-react'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';
import { useStore } from '@/zustand/store';



const SubSideBar = () => {
    const user = useStore((state) => state.user)
    const activeLeftNav = useStore((state) => state.activeLeftNav)
    const setActiveLeftNav = useStore((state) => state.setActiveLeftNav)

    return (
        <div className='w-[64px] flex-shrink-0 col-span-1 h-full flex flex-col border-r-[1px] bg-gray-100 relative px-2 z-50'>
            <div
                onClick={() => setActiveLeftNav("chat")}
                className={`w-10 h-10 flex items-center justify-center mt-3 mx-auto rounded-full cursor-pointer hover:bg-gray-300 ${activeLeftNav === "chat" ? "bg-gray-300" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text-icon lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M13 8H7" /><path d="M17 12H7" /></svg>
            </div>
            <div
                onClick={() => setActiveLeftNav("calls")}
                className={`w-10 h-10 flex items-center justify-center mt-2 mx-auto rounded-full cursor-pointer hover:bg-gray-300 ${activeLeftNav === "calls" ? "bg-gray-300" : ""}`}
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone-call"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.86 19.86 0 0 1 2.11 4.18 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="M14.05 2a9 9 0 0 1 7.93 7.93"/><path d="M14.05 6A5 5 0 0 1 18 10"/></svg>
            </div>
            <hr className='w-12 border-gray-300 mx-auto mt-2' />
            <div className='w-full flex-1 min-h-0 flex flex-col items-center justify-end mb-2'>
                <div className='border-t-[1px] border-gray-300'>
                    <div className=' h-10 w-10 mt-2 mx-auto flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200'>
                        <DropdownMenu>
                            <DropdownMenuTrigger className='outline-none '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings text-gray-600"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Setting</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className='text-red-600  cursor-pointer bg-white hover:bg-gray-100 m-0 p-0'>
                                    <Button variant="ghost" className='h-7 hover:text-red-600 ' onClick={() => signOut({ callbackUrl: '/' })}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-log-out-icon lucide-log-out"><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /></svg>
                                        <p>Log Out</p>
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className=' h-10 w-10  mx-auto flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200'>
                        <Avatar className='h-10 w-10'>
                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} className='bg-center bg-no-repeat'/>
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SubSideBar
