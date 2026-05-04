import axios from "axios";
import api from "@/lib/axios";

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

export type CallHistoryPage = {
    data: CallHistoryItem[];
    nextCursor: string | null;
    hasMore: boolean;
};

export const getCallHistory = async (params?: {
    limit?: number;
    cursor?: string | null;
    conversationId?: string;
}): Promise<CallHistoryPage> => {
    const limit = params?.limit ?? 20;
    try {
        const response = await api.get(`/api/v1/call/history`, {
            params: {
                limit,
                ...(params?.cursor ? { cursor: params.cursor } : {}),
                ...(params?.conversationId ? { conversationId: params.conversationId } : {}),
            },
        });
        const rows: CallHistoryItem[] = response?.data?.data || [];
        const derivedHasMore = rows.length >= limit;
        const nextCursor = derivedHasMore && rows.length > 0 ? rows[rows.length - 1].created_at : null;
        return {
            data: rows,
            hasMore: derivedHasMore,
            nextCursor,
        };
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                hasMore: false,
                nextCursor: null,
            };
        }
        throw error;
    }
};
