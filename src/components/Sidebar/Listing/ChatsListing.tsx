import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { localTimeZone } from '@/utils/localTimeZone';
import { ConversationParticipantType, SearchChatsContactsType } from '../../../../types';
import { HighlightedText } from '@/components/common/HighlightedText';



const ChatsListing = ({ data, search }: { data: SearchChatsContactsType | ConversationParticipantType, search: string }) => {
    let date = localTimeZone(`${data?.joined_at}`);
    const [isHovered, setIsHovered] = useState(false)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    return (
        <div key={data.id} className='w-full h-[68px] mt-2 px-2  relative group'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className='grid grid-cols-10 w-full h-[68px] rounded-xl hover:bg-gray-100'>

                <div className='col-span-2 flex justify-center items-center'>
                    {data?.image ? <Avatar className='h-12 w-12'>
                        <AvatarImage src={data.image} />
                        <AvatarFallback>DP</AvatarFallback>
                    </Avatar> :
                        <div className='w-10 h-10  grid place-content-center bg-gray-200 rounded-full'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user-round-icon lucide-user-round "><circle cx="12" cy="8" r="5" /><path d="M20 21a8 8 0 0 0-16 0" /></svg>
                        </div>
                    }
                </div>
                <div className='col-span-6 '><p className='mt-2 text-lg'><HighlightedText name={`${data.first_name} ${data.last_name}`} search={search} />
                </p>
                    <div className='flex'>
                        <p className='text-sm font-light text0gray-500'>{data?.conversation?.message![0]?.content as string}</p>
                    </div>
                </div>
            </div>
            <div className='col-span-2 mt-2'>
                <p className='text-xs font-thin text-center'>
                    {date ? date : "NA"}
                </p>
                <span >
                    <DropdownMenu open={isDropdownOpen} onOpenChange={setIsDropdownOpen}>
                        <DropdownMenuTrigger className={`absolute top-9 right-7 transition-opacity bo duration-200 ${isHovered || isDropdownOpen ? "opacity-100" : "opacity-0"
                            }`}>
                            {/* <div className='h-8 w-8 hover:bg-gray-200 flex justify-center items-center rounded-full'> */}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6" /></svg>
                            {/* </div> */}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align='start' className='w-52 rounded-xl' onClick={() => setIsHovered(false)} >
                            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel> */}
                            <DropdownMenuItem className='h-8 px-4 text-[#484a4d] font-thin'>
                                <div className='w-full grid grid-cols-5 text-base items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="col-span-1 lucide lucide-book-down-icon lucide-book-down"><path d="M12 13V7" /><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" /><path d="m9 10 3 3 3-3" /></svg>
                                    <p className='col-span-4'>Archive chat</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='h-8 px-4 text-[#676d76] font-thin'>
                                <div className='w-full grid grid-cols-5 text-base items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className=" col-span-1 lucide lucide-bell-off-icon lucide-bell-off"><path d="M10.268 21a2 2 0 0 0 3.464 0" /><path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" /><path d="m2 2 20 20" /><path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" /></svg>
                                    <p className='col-span-4'>Mute notifications</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='h-8 px-4 text-[#676d76] font-thin'>
                                <div className='w-full grid grid-cols-5 text-base items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pin-icon lucide-pin"><path d="M12 17v5" /><path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" /></svg>
                                    <p className='col-span-4'>Pin chat</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='h-8 px-4 text-[#676d76] font-thin'>
                                <div className='w-full grid grid-cols-5 text-base items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-square-dot-icon lucide-message-square-dot"><path d="M11.7 3H5a2 2 0 0 0-2 2v16l4-4h12a2 2 0 0 0 2-2v-2.7" /><circle cx="18" cy="6" r="3" /></svg>
                                    <p className='col-span-4'>Mark as unread</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className='h-8 px-4 text-[#676d76] font-thin'>
                                <div className='w-full grid grid-cols-5 text-base items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-ban-icon lucide-ban"><circle cx="12" cy="12" r="10" /><path d="m4.9 4.9 14.2 14.2" /></svg>
                                    <p className='col-span-4'>Block</p>
                                </div>
                            </DropdownMenuItem>
                            <DropdownMenuItem className='h-8 px-4 text-[#676d76] font-thin'>
                                <div className='w-full grid grid-cols-5 text-base items-center'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash2-icon lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
                                    <p className='col-span-4'>Delete chat</p>
                                </div>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </span>
            </div>
        </div>
    )
}

export default ChatsListing