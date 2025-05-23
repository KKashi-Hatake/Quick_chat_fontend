import ChatBase from '@/components/chat/ChatBase'
import { fetchChats } from '@/fetch/chatsFetch';
import { fetchChatGroup, fetchChatUsers } from '@/fetch/groupFetch';
import { notFound } from 'next/navigation'
import React from 'react'

async function Chat ({ params }: { params:Promise<{ id: string }> }) {
    const {id} = await params;
    if (id.length !== 36) {
        return notFound();
    }

    const group: ChatGroupType | null = await fetchChatGroup(id)

    if (group === null) {
        return notFound();
    }

    const users: Array<GroupChatUserType> | [] = await fetchChatUsers(id)
    const chats: Array<MessageType> | [] = await fetchChats(id)

    return (
        <div>
            <ChatBase group={group} users={users} oldMessages={chats} />
        </div>
    )
}

export default Chat