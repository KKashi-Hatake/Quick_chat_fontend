import React, { useState } from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { localTimeZone } from '@/utils/localTimeZone';
import { SearchChatsContactsType, StoreType } from '../../../../types';
import { HighlightedText } from '@/components/common/HighlightedText';
import { useStore } from '@/zustand/store';







const ContactsListing = ({ data, search }: { data: SearchChatsContactsType, search: string }) => {
    const setParticipant = useStore((state: StoreType) => state.setConvParti);

    const handleClick = () => {
        setParticipant(data)
    }
    
    return (
        <div key={data.id} className='w-full h-[68px] mt-2 px-2  relative group cursor-pointer'
            onClick={handleClick}
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
                        <p className='text-sm font-light text0gray-500'>{data?.about || "Hey There! I am using Quick Chat"}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactsListing