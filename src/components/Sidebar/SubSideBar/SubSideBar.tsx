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

    return (
        <div className='col-span-1 border-r-[1px] bg-gray-100 relative z-50'>
            <div className='w-10 h-10 flex items-center justify-center mt-3 mx-auto rounded-full cursor-pointer hover:bg-gray-300 '>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-text-icon lucide-message-square-text"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /><path d="M13 8H7" /><path d="M17 12H7" /></svg>
            </div>
            <hr className='w-12 border-gray-300 mx-auto mt-2' />
            <div className=' w-full h-[calc(100vh-72px)] flex flex-col items-center justify-end mb-2 '>
                <div className='border-t-[1px] border-gray-300'>
                    <div className=' h-10 w-10 mt-2 mx-auto flex items-center justify-center rounded-full cursor-pointer hover:bg-gray-200'>

                        <DropdownMenu>
                            <DropdownMenuTrigger className='outline-none '>
                                <svg xmlns="http://www.w3.org/2000/svg" width="23" height="23" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings-icon lucide-settings text-gray-600"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>Setting</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                {/* <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem> */}
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
                        <Avatar className='h-7 w-7'>
                            <AvatarImage src={user?.image || "https://github.com/shadcn.png"} />
                            <AvatarFallback>DP</AvatarFallback>
                        </Avatar>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default SubSideBar