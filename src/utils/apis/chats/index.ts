import { GetMessageResponseType, MessagePayload, SentMessageResponseType } from "../../../../types";
import { toast } from "sonner";
import api from "@/lib/axios";





export const sendMessage = async (payload: MessagePayload) => {
    try {
        const res: SentMessageResponseType = await api.post(`/api/v1/chat/send`, payload);
        if (res?.data?.success) {
            return res?.data?.msg;
        } else {
            toast(res?.data?.message)
            return null
        }
    } catch (error) {
        console.log("error while callig search user api", error);
        return null
    }
}


export const getMessages = async (id:number, cursor:Date|string) => {
    try {
        const res: GetMessageResponseType = await api.get(`/api/v1/chat/getMessages/${id}?limit=10${cursor ? `&cursor=${cursor}` : ''}`);
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