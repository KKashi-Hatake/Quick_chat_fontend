import { create } from 'zustand'
import { ConversationParticipantType, MessageType, StoreType, User } from "../../types"
import { Socket } from 'socket.io-client'


export const useStore = create<StoreType>((set) => ({
    user: null,
    convParti: null,
    conversations: null,
    message: null,
    messageIds: null,
    socket: null,

    setSocket: (newSocket: Socket) => set({ socket: newSocket }),
    setMessage: (newMessage: Map<string, MessageType>) => set({ message: newMessage }),
    setMessageIds: (newMessageIds: string[] ) => set({ messageIds: newMessageIds }),
    setConvParti: (newConvParti: ConversationParticipantType) => set({ convParti: newConvParti }),
    setUser: (newUser: User) => set({ user: newUser }),
    setConversations: (newCoversations: ConversationParticipantType[]) => set({ conversations: newCoversations }),
}))
