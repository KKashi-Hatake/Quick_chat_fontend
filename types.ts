import { Socket } from "socket.io-client"


export type User = {
    id: string
    name: string
    image: string | null,
    phone: string
    created_at: Date,
    verificationId: string,
    twoFAId: string | null,
    token: string | null,
    about?: string
}

export type StoreType = {
    user: User | null,
    message: Map<string, MessageType> | null,
    messageIds: string[] | null,
    socket: Socket | null,
    conversations: ConversationParticipantType[] | null,
    convParti: ConversationParticipantType | null,

    setUser: Function,
    setSocket: Function,
    setMessage: Function,
    setMessageIds: Function,
    setConvParti: Function
    setConversations: Function
}


export type searchUserType = {
    data: {
        success: boolean,
        message: string,
        user: string,
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
    id: string,
    messageId: string,
    status: string,
    created_at: Date,
    updated_at: Date
}

export type MessageType = {
    id: string
    content: string
    senderId: string
    sender: {
        userId: string
    }
    conversationId: string
    messageType: string
    mediaUrl: string | null
    created_at: Date
    is_deleted: boolean
    MessageStatus: MessageStatusType
}

export type ConversationType = {
    id: string
    name: string | null
    description: string | null
    created_by: string
    avatar: string | null
    type: string
    created_at: Date,
    updated_at: Date,
    messages?: MessageType[] | null
} | null


export type ConversationParticipantType = {
    id: string,
    first_name?: string,
    last_name?: string,
    conversationId?: string | null,
    conversation?: ConversationType | null,
    image?: string | null,
    userId: string,
    created_at: Date,
    updated_at: Date,
    role: string,
    created_by: string,
    unreadCount?: number,
}


export type SearchChatsContactsType = {
    id: string
    first_name?: string | null
    last_name?: string | null
    conversationId?: string | null
    conversation?: ConversationType | null,
    image?: string | null
    userId: string
    created_at: Date
    updated_at: Date
    role: string
    about: string
    created_by: string
    unreadCount?: number
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
    userId: string,
    msg: string,
    convType: string,
    partiId: string,
    mediaUrl: string,
    type: string
}


export type SentMessageType = {
    id: string,
    content: string,
    senderId: string,
    receiverId: string,
    conversationId: string,
    sender: {
        userId: string
    }
    messageType: string,
    mediaUrl: string | null,
    created_at: Date,
    updated_at: Date,
    is_deleted: boolean,
    MessageStatus: {
        id: string,
        messageId: string,
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


export type GetMessageResponseType = {
    data: {
        success: boolean,
        message: string,
        data: MessageType[]
    }
}