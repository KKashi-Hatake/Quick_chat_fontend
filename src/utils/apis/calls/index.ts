import axios from "axios";

export type CallHistoryItem = {
    id: string;
    callId: string;
    callerUserId: string;
    receiverUserId: string;
    conversationId?: string | null;
    callType: "video" | "audio";
    status: string;
    startedAt?: string | null;
    endedAt?: string | null;
    durationSec?: number | null;
    created_at: string;
    caller?: {
        id: string;
        name: string | null;
        phone: string | null;
        image: string | null;
    } | null;
    receiver?: {
        id: string;
        name: string | null;
        phone: string | null;
        image: string | null;
    } | null;
    callerParticipant?: {
        first_name: string | null;
        last_name: string | null;
    } | null;
    receiverParticipant?: {
        first_name: string | null;
        last_name: string | null;
    } | null;
};

export const getCallHistory = async (): Promise<CallHistoryItem[]> => {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/call/history`, {
        withCredentials: true,
    });
    return response?.data?.data || [];
};
