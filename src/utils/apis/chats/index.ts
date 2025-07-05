import { MessagePayload, SentMessageResponseType } from "../../../../types";
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