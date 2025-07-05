import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { localTimeZone } from '@/utils/localTimeZone'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ConversationParticipantType, SearchChatsType } from '../../../../types'
import { searchChatsContacts } from '@/utils/apis/searchUser'
import ContactsListing from './ContactsListing'
import { useStore } from '@/zustand/store'
import ChatsListing from './ChatsListing'






const Listing = ({ searchTerm }: { searchTerm: string }) => {
    const conversations = useStore(state => state.conversations)
    const [data, setData] = useState<SearchChatsType | null>(null);

    useEffect(() => {
        const getUser = async () => {
            const result = await searchChatsContacts(searchTerm);
            setData(result);
        };
        if (searchTerm) {
            getUser();
        }
    }, [searchTerm]);


    return (
        <>
            {searchTerm ?
                <div >
                    {data?.contacts?.length !== 0 &&
                        <div className='h-fit'>
                            <p className='m-6 text-gray-700 font-semibold text-base'>Contacts</p>
                            {data?.contacts?.map((val: any, i) => {
                                return (
                                    <ContactsListing key={i} data={val} search={searchTerm} />
                                )
                            })}
                        </div>
                    }

                    {data?.chats?.length !== 0 &&
                        <div className='h-fit'>
                            <p className='m-6 text-gray-700 font-semibold text-base'>Chats</p>
                            {data?.chats?.map((val: any, i) => {
                                return (
                                    <ChatsListing key={i} data={val} search={searchTerm} />
                                )
                            })}
                        </div>
                    }

                </div> :
                <div>
                    {conversations?.length !== 0 && conversations?.map((val: ConversationParticipantType, i) => {
                        return (
                            <ChatsListing key={i} data={val} search={searchTerm} />
                        )
                    })}
                </div>
            }
        </>
    )
}

export default Listing