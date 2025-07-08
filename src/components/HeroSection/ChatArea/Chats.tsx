import React, { useEffect, useRef, useState } from 'react'
import { MessageType, User } from '../../../../types'
import convertUTCToIST from '@/utils/helper/ConvertUTCtoIST'
import { getMessages } from '@/utils/apis/chats';
import { useStore } from '@/zustand/store';

const Chats = ({ convId, user }: { convId: number, user: User }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const topSentinelRef = useRef<HTMLDivElement>(null);

    const messages = useStore(state => state.message);
    const setMessages = useStore(state => state.setMessage);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMessages = async (cursor?: string) => {
        if (convId === 0) return;
        setLoading(true);
        const res = await getMessages(convId, messages ? messages[0]?.created_at : "");
        if (res) {
            if (res.length < 10) setHasMore(false);
            setMessages([...res.reverse(), ...(messages || [])]);
        }
        const scrollContainer = containerRef.current;
        const prevHeight = scrollContainer?.scrollHeight ?? 0;
        setTimeout(() => {
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight - prevHeight;
            }
        }, 0);
        setLoading(false);
    };

    useEffect(() => {
        if (convId) {
            fetchMessages();
        }
    }, [convId]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                const topEntry = entries[0];
                if (topEntry.isIntersecting && !loading && hasMore) {
                    fetchMessages();
                }
            },
            {
                root: containerRef.current,
                threshold: 1.0,
            }
        );

        if (topSentinelRef.current) {
            observer.observe(topSentinelRef.current);
        }

        return () => {
            if (topSentinelRef.current) {
                observer.unobserve(topSentinelRef.current);
            }
        };
    }, [hasMore, loading]);

    return (
        <div
            ref={containerRef}
            className="-flex-1 overflow-y-auto mb-14"
        >
            {/* 👇 Sentinel: watched by IntersectionObserver */}
            <div ref={topSentinelRef}></div>
            {
                messages?.length && messages.map((message) => {

                    return (
                        <div key={message.id} className="flex-1 overflow-y-auto p-4 space-y-4">
                            {/* {messages.map((message) => ( */}
                            <div className={`flex ${message.senderId !== user.id ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`relative max-w-xs lg:max-w-md px-4 py-2  ${message.senderId !== user.id ? "bg-blue-500 text-white rounded-tl-lg rounded-bl-lg rounded-br-lg" : "bg-white text-gray-800 border border-gray-200 rounded-tr-lg rounded-bl-lg rounded-br-lg"
                                        }`}
                                >
                                    {/* Message Text */}
                                    <p className="text-sm">{message.content}</p>

                                    {/* Timestamp */}
                                    <p className={`text-xs mt-1 ${message.senderId !== user.id ? "text-green-100" : "text-gray-500"}`}>
                                        {convertUTCToIST(message.created_at)}
                                    </p>

                                    {/* Message Tail/Arrow */}
                                    {message.senderId !== user.id ? (
                                        // Right-pointing arrow for sent messages
                                        <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-blue-500 border-t-8 border-t-transparent rotate-[90deg]"></div>
                                    ) : (
                                        // Left-pointing arrow for received messages
                                        <div className="absolute top-0 -left-2 w-0 h-0 border-r-8 border-r-white border-t-8 border-t-transparent rotate-[-90deg]"></div>
                                    )}
                                </div>
                                <div></div>
                            </div>
                            {/* ))} */}
                        </div>
                    )
                })
            }</div>
    )
}




export default Chats