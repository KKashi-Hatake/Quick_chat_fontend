import { create } from 'zustand'
import { StoreType, User } from "../../types"


export const useStore = create<StoreType>((set) => ({
    user: null,
    setUser: (newUser: User) => set({ user: newUser }),
}))
