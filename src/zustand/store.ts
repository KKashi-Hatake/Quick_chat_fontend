import { create } from 'zustand'
import { ConversationParticipantType, StoreType, User } from "../../types"


export const useStore = create<StoreType>((set) => ({
    user: null,
    convParti: null,
    setConvParti: (newConvParti: ConversationParticipantType) => set({ convParti: newConvParti }),
    setUser: (newUser: User) => set({ user: newUser }),
}))
