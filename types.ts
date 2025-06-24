

export type User = {
    id: number
    name: string
    image: string | null,
    phone: string
    created_at: Date,
    verificationId: number,
    twoFAId: number | null,
    token: string | null,
    about?: string
}

export type StoreType = {
    user: User | null,
    setUser: Function,
    convParti: ConversationParticipantType | null,
    setConvParti: Function
    conversations: ConversationParticipantType[] | null,
    setConversations: Function
}


export type searchUserType = {
    data: {
        success: boolean,
        message: string,
        user: number,
    }
}


export type CreateConvPartiType = {
    data: {
        success: boolean,
        message: string,
        convParti: ConversationParticipantType,
    }
}



export type GetConversationType = {
    data: {
        success: boolean,
        message: string,
        data: ConversationParticipantType[],
    }
}


export type MessageType = {
    id: number
    content: string
    senderId: number
    conversationId: number
    messageType: string
    mediaUrl?: string
    created_at: Date
    is_deleted: boolean
}

export type ConversationType = {
    id: number
    name: string | null
    description: string | null
    created_by: number
    avatar: string | null
    type: string
    created_at: Date,
    message?: MessageType[] | null
} | null


export type ConversationParticipantType = {
    id: number,
    first_name?: string,
    last_name?: string,
    conversationId?: number | null,
    conversation?: ConversationType | null,
    image?: string | null,
    userId: number,
    joined_at: Date,
    role: string,
    created_by: number,
}


export type SearchChatsContactsType = {
    id: number
    first_name?: string | null
    last_name?: string | null
    conversationId?: number | null
    conversation?: ConversationType | null,
    image?: string | null
    userId: number
    joined_at: Date
    role: string
    about: string
    created_by: number
}

export type SearchChatsType = {
    chats?: SearchChatsContactsType[],
    contacts?: SearchChatsContactsType[]
}


export type SearchChatsContactsResultType = {
    data: {
        success: boolean,
        message: string,
        result: SearchChatsType
    }
}

