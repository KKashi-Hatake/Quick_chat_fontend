
import { searchUserType } from "../../../../types";
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
    id: number,
    firstName: string,
    lastName: string,
}) => {
    try {
        const res: any = await api.post(`/api/v1/user/create-conversation-participant`, payload);
        if (res?.data?.success) {
            return res?.data?.message;
        } else {
            toast(res?.data?.message)
            return null
        }
    } catch (error) {
        console.log("error while callig search user api", error);
        return null
    }
}







