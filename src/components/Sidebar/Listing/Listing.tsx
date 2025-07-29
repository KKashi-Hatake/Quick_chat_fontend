import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { localTimeZone } from '@/utils/localTimeZone'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { ConversationParticipantType, SearchChatsType } from '../../../../types'
import { searchChatsContacts } from '@/utils/apis/searchUser'
import ContactsListing from './ContactsListing'
import { useStore } from '@/zustand/store'
import ChatsListing from './ChatsListing'
import ackListener from '@/utils/socketListeners/ackListner'
import messageListener from '@/utils/socketListeners/messageListener'






const Listing = ({ searchTerm }: { searchTerm: string }) => {
    const socket = useStore(state => state.socket);
    const user = useStore(state => state.user);
    const convParti = useStore(state => state.convParti);
    const setConversation = useStore((state) => state.setConversations);
    const conversation = useStore((state) => state.conversations);
    const message = useStore(state => state.message);
    const setMessage = useStore(state => state.setMessage)
    const messageIds = useStore(state => state.messageIds);
    const setMessageIds = useStore(state => state.setMessageIds)
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

    useEffect(() => {
        const removeMessageListener = messageListener({
            // user, 
            socket,
            message,
            setMessage,
            messageIds,
            setMessageIds,
            setConversation,
            convParti,
            conversation
        });

        const removeAckListener = ackListener({
            user,
            socket,
            message,
            setMessage,
            messageIds,
            setMessageIds,
            setConversation,
            convParti,
            conversation
        });
        
        return () => {
            removeMessageListener && removeMessageListener();
            removeAckListener && removeAckListener();
        };
    }, [convParti, messageIds, conversation])

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
                    {conversation?.length !== 0 && conversation?.map((val: ConversationParticipantType, i) => {
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