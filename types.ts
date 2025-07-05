

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


export type MessageStatusType = {
    id: number,
    messageId: number,
    status: string,
    created_at: Date,
    updated_at: Date
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
    MessageStatus: MessageStatusType
}

export type ConversationType = {
    id: number
    name: string | null
    description: string | null
    created_by: number
    avatar: string | null
    type: string
    created_at: Date,
    updated_at: Date,
    messages?: MessageType[] | null
} | null


export type ConversationParticipantType = {
    id: number,
    first_name?: string,
    last_name?: string,
    conversationId?: number | null,
    conversation?: ConversationType | null,
    image?: string | null,
    userId: number,
    created_at: Date,
    updated_at: Date,
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
    created_at: Date
    updated_at: Date
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



export type MessagePayload = {
    userId: number,
    msg: string,
    convType: string,
    partiId: number,
    mediaUrl: string,
    type: string
}


export type SentMessageType = {
    id: number,
    content: string,
    senderId: number,
    receiverId: number,
    conversationId: number,
    messageType: string,
    mediaUrl: string | null,
    created_at: Date,
    updated_at: Date,
    is_deleted: boolean,
    MessageStatus: {
        id: number,
        messageId: number,
        status: string,
        created_at: Date,
        updated_at: Date
    }
}


export type SentMessageResponseType = {
    data: {
        success: boolean,
        message: string,
        msg: SentMessageType
    }
}
