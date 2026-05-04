import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStore } from "@/zustand/store";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { StoreType } from "../../../../types";
import { CallHistoryItem, getCallHistory } from "@/utils/apis/calls";

const statusLabelMap: Record<string, string> = {
    ended: "Completed",
    missed: "Missed",
    rejected: "Rejected",
    cancelled: "Cancelled",
    busy: "Busy",
    failed: "Failed",
    active: "Active",
    ringing: "Ringing",
    initiated: "Initiated",
};

const CallLogs = () => {
    const [logs, setLogs] = useState<CallHistoryItem[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [nextCursor, setNextCursor] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const isFetchingRef = useRef(false);
    const user = useStore((state: StoreType) => state.user);

    const fetchHistory = useCallback(async (cursor?: string | null) => {
        if (isFetchingRef.current) return;
        isFetchingRef.current = true;
        setIsLoading(true);
        try {
            const page = await getCallHistory({
                limit: 15,
                cursor: cursor || undefined,
            });
            setLogs((prev) => (cursor ? [...prev, ...page.data] : page.data));
            setHasMore(page.hasMore);
            setNextCursor(page.nextCursor);
            if (!page.hasMore) {
                setNextCursor(null);
            }
        } finally {
            setIsLoading(false);
            isFetchingRef.current = false;
        }
    }, []);

    useEffect(() => {
        fetchHistory(null);
    }, [fetchHistory]);

    const items = useMemo(() => {
        if (!user?.id) return [];
        return logs.map((log) => {
            const isCaller = log.callerUserId === user.id;
            const counterpartUser = isCaller ? log.receiver : log.caller;
            const counterpartParticipant = isCaller ? log.receiverParticipant : log.callerParticipant;
            const participantName = `${counterpartParticipant?.first_name || ""} ${counterpartParticipant?.last_name || ""}`.trim();
            const displayName = participantName || counterpartUser?.phone || counterpartUser?.name || "Unknown";
            const time = new Date(log.created_at).toLocaleString();
            const durationInSec = typeof log.durationSec === "number" ? log.durationSec : null;
            const duration = durationInSec !== null ? `${Math.floor(durationInSec / 60)}m ${durationInSec % 60}s` : "-";
            return {
                id: log.id,
                image: counterpartUser?.image,
                displayName,
                statusLabel: statusLabelMap[log.status] || log.status,
                duration,
                time,
            };
        });
    }, [logs, user?.id]);

    return (
        <div className="h-full w-[calc(100vw-45%-64px)] md:w-[calc(100vw-40%-64px)] xl:w-[calc(100vw-30%-64px)] flex flex-col border">
            <div className="h-16 flex items-center px-5 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Call Logs</h2>
            </div>
            <div
                className="flex-1 overflow-y-auto"
                onScroll={(e) => {
                    const el = e.currentTarget;
                    const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 48;
                    if (nearBottom && hasMore && nextCursor && !isLoading) {
                        fetchHistory(nextCursor);
                    }
                }}
            >
                {items.length === 0 ? (
                    <div className="h-full flex items-center justify-center text-sm text-gray-500">No call logs yet.</div>
                ) : (
                    <>
                        {items.map((item) => (
                            <div key={item.id} className="flex items-center gap-4 p-4 border-b hover:bg-gray-50">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={item.image || "https://github.com/shadcn.png"} />
                                    <AvatarFallback>{item.displayName.slice(0, 1).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{item.displayName}</p>
                                    <p className="text-xs text-gray-500">{item.time}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-medium text-gray-700">{item.statusLabel}</p>
                                    <p className="text-xs text-gray-500">Duration: {item.duration}</p>
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className="py-4 text-center text-xs text-gray-500">Loading more...</div>
                        )}
                        {!hasMore && !isLoading && items.length > 0 && (
                            <div className="py-4 text-center text-xs text-gray-400">No more call logs.</div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default CallLogs;
