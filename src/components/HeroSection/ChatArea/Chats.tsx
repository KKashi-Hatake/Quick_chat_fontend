import React, { useEffect, useRef, useState } from 'react'
import { MessageType, StoreType, User } from '../../../../types'
import convertUTCToIST from '@/utils/helper/ConvertUTCtoIST'
import { getMessages } from '@/utils/apis/chats';
import { useStore } from '@/zustand/store';
import messageListener from '@/utils/socketListeners/messageListener';

const Chats = ({ user }: { user: User }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const topSentinelRef = useRef<HTMLDivElement>(null);
    const convParti = useStore((state: StoreType) => state.convParti);
    const conversation = useStore((state: StoreType) => state.conversations);
    const setConversation = useStore((state: StoreType) => state.setConversations);

    const socket = useStore(state => state.socket);
    const messages = useStore(state => state.message);
    const setMessages = useStore(state => state.setMessage);
    const messageIds = useStore(state => state.messageIds);
    const setMessageIds = useStore(state => state.setMessageIds);
    const [loading, setLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const fetchMessages = async (cursor?: string) => {
        if (!convParti) return;
        setLoading(true);
        const res = await getMessages(convParti?.conversation?.id as string, messages && messages.get(messageIds ? messageIds[0] : "")?.created_at || "");
        if (res) {
            if (res.length < 10) setHasMore(false);
            let ids: string[] = [], msgIds: Map<string, MessageType> = new Map();
            res.forEach((message: MessageType) => {
                ids.push(message.id);
                msgIds.set(message.id, message);
            })
            setMessageIds([...ids.reverse(), ...(messageIds || [])]);
            setMessages(new Map([...[...msgIds].reverse(), ...(messages || [])]));
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

    // useEffect(() => {
    //     messageListener({ user, socket, message: messages, setMessage: setMessages, messageIds, setMessageIds, setConversation, convParti, conversation });
    // }, [convParti, messageIds, conversation])

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

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }, [messages]); // Runs once on initial render

    useEffect(() => {
        function markMessageAsRead() {
            let data = {
                conversation: convParti?.conversation?.id || "",
                receiver: convParti?.id || "",
                userId: user.id || "",
                receiverId: convParti?.userId || "",
            }
            if (!data?.conversation ||
                !data?.receiver ||
                !data?.userId ||
                !data?.receiverId) {
                console.error('Something went wrong while marking all the unread messages as read.')
                return;
            }
            if (socket) {
                socket.emit('message:read', data);
            } else {
                console.error('Socket not found while marking all the unread messages as read.')
                return;
            }
        }
        markMessageAsRead();
    }, [messageIds])

    
    return (
        <div
            ref={containerRef}
            className="-flex-1 w-full overflow-y-auto mt-[1px] h-[calc(100vh-130px)] 
            [&::-webkit-scrollbar]:w-1
            [&::-webkit-scrollbar-track]:rounded-full
            
            [&::-webkit-scrollbar-thumb]:rounded-full
            [&::-webkit-scrollbar-thumb]:bg-gray-500
            dark:[&::-webkit-scrollbar-track]:bg-neutral-700
            dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500
            "
        >
            <div ref={topSentinelRef}></div>
            {
                messageIds && messageIds?.length > 0 && messageIds.map((messageId, i) => {
                    let message = null;
                    if (messages && messages.has(messageId)) { message = messages.get(messageId); }

                    return (
                        message && <div key={message.id} className="flex-1 overflow-y-auto px-8 mt-[2px]">
                            {/* {messages.map((message) => ( */}
                            <div className={`flex ${message.sender.userId !== user.id ? "justify-end" : "justify-start"}`}>
                                <div
                                    className={`relative max-w-xs lg:max-w-md p-1 px-2 leading-[0] ${message.sender.userId !== user.id ? "bg-[#5ebfff] text-black rounded-tl-lg rounded-bl-lg rounded-br-lg" : "bg-white text-gray-800 border border-gray-200 rounded-tr-lg rounded-bl-lg rounded-br-lg"
                                        }`}
                                >
                                    <div className='flex'>

                                        {/* Message Text */}
                                        <p className="text-sm p-0 relative ">{message.content}
                                            {/* Timestamp */}
                                            <span className={`relative bottom-0 right-0 text-xs h-fit text-nowrap -mt-1 font-thin ml-2 text-end flex  justify-end ${message.sender.userId !== user.id ? "text-black" : "text-gray-500"}`}>
                                                {convertUTCToIST(message.created_at)}
                                                {
                                                    message?.sender?.userId === user!.id && <span className='ml-1'>
                                                        {
                                                            message?.MessageStatus?.status === 'sent' ?
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-icon lucide-check"><path d="M20 6 9 17l-5-5" /></svg> :
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-check-check-icon lucide-check-check ${message?.MessageStatus?.status === "read" && "text-blue-500"}`}><path d="M18 6 7 17l-5-5" /><path d="m22 10-7.5 7.5L13 16" /></svg>
                                                        }
                                                    </span>
                                                }
                                            </span>
                                        </p>
                                    </div>

                                    {/* Message Tail/Arrow */}
                                    {message.sender.userId !== user.id ? (
                                        // Right-pointing arrow for sent messages
                                        <div className="absolute top-0 -right-2 w-0 h-0 border-l-8 border-l-[#5ebfff] border-t-8 border-t-transparent rotate-[90deg]"></div>
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