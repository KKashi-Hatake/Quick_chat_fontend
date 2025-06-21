type ChatGroupType = {
    id: string;
    user_id: number;
    title: string;
    passcode: string;
    created_at: string;
}


type GroupChatUserType = {
    id: number;
    name: string;
    group_id: string;
    created_at: string;
}

type MessageType = {
    id: string;
    group_id: string;
    name: string;
    message: string;
    created_at: string;
}

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


export type ConversationParticipantType = {
    id: number,
    first_name?: string,
    last_name?: string,
    conversationId?: number | null,
    image?: string | null,
    userId: number,
    joined_at: Date,
    role: string,
    created_by: number,
}


