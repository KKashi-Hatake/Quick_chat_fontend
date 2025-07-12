
import { CreateConvPartiType, GetConversationType, SearchChatsContactsResultType, searchUserType } from "../../../../types";
import { toast } from "sonner";
import api from "@/lib/axios";





export const searchUser = async (payload: string) => {
    try {
        const res: searchUserType = await api.get(`/api/v1/user/search?search=${payload}`);
        if (res?.data?.success) {
            return res?.data?.user;
        } else {
            toast(res?.data?.message)
            return null
        }
    } catch (error) {
        console.log("error while callig search user api", error);
        return null
    }
}

export const createConversationPaticipant = async (payload: {
    id: string,
    firstName: string,
    lastName: string,
}) => {
    try {
        const res: CreateConvPartiType = await api.post(`/api/v1/user/create-conversation-participant`, payload);
        if (res?.data?.success) {
            return res?.data?.convParti;
        } else {
            toast(res?.data?.message)
            return null
        }
    } catch (error) {
        console.log("error while callig search user api", error);
        return null
    }
}


export const searchChatsContacts = async (payload: string) => {
    try {
        const res: SearchChatsContactsResultType = await api.get(`/api/v1/user/search-chats-contacts?search=${payload}`);
        if (res?.data?.success) {
            return res?.data?.result;
        } else {
            toast(res?.data?.message)
            return null
        }
    } catch (error) {
        console.log("error while callig search user api", error);
        return null
    }
}




export const getConversations = async () => {
    try {
        const res: GetConversationType = await api.get(`/api/v1/conv/getAll`);
        if (res?.data?.success) {
            return res?.data?.data;
        } else {
            toast(res?.data?.message)
            return null
        }
    } catch (error) {
        console.log("error while callig search user api", error);
        return null
    }
}






