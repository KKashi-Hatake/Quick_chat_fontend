import { create } from 'zustand'
import { ConversationParticipantType, MessageType, StoreType, User } from "../../types"


export const useStore = create<StoreType>((set) => ({
    user: null,
    convParti: null,
    conversations: null,
    message:null,
    setMessage: (newMessage: MessageType[]) => set({ message : newMessage }),
    setConvParti: (newConvParti: ConversationParticipantType) => set({ convParti: newConvParti }),
    setUser: (newUser: User) => set({ user: newUser }),
    setConversations: (newCoversations: ConversationParticipantType[]) => set({ conversations: newCoversations }),
}))
