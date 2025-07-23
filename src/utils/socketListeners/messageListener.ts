import { Socket } from "socket.io-client";
import { ConversationParticipantType, MessageType, StoreType, User } from "../../../types";



type paramsType = {
    // user: User | null,
    socket: Socket | null;
    message: Map<string, MessageType> | null;
    messageIds: string[] | null;
    setMessage: Function;
    setMessageIds: Function;
    setConversation: Function;
    convParti: ConversationParticipantType | null;
    conversation: ConversationParticipantType[] | null;
}

export default function messageListener({
    // user,
    socket,
    message,
    setMessage,
    messageIds,
    setMessageIds,
    setConversation,
    convParti,
    conversation
}: paramsType) {

    const messageReadFunc = (data: any) => {
        if (convParti && convParti?.conversation?.id === data.convParti?.conversationId) {
            const sound = new Audio('/assets/sounds/message.mp3');
            sound.play().catch((err) => {
                console.warn('Failed to play notification sound:', err);
            });
            setMessageIds([...(messageIds || []), data.message.id]);
            if (message !== null) {
                message.set(data.message.id, data.message)
                setMessage(new Map([...message]));
            } else {
                let msg: Map<string, MessageType> = new Map();
                msg.set(data.message.id, data.message);
                setMessage(msg);
            };
        } else {
            const sound = new Audio('/assets/sounds/newMessage.mp3');
            sound.play().catch((err) => {
                console.warn('Failed to play notification sound:', err);
            });
            if (socket) {
                socket.emit('message:delivered', { receiver: data.convParti.id, conversation: data.convParti.conversationId, receiverId: data.convParti.userId });
            } else {
                console.log("Socket not found while triggering event to mark message as delivered.")
            }

        }

        setConversation(conversation?.map((val) => {
            if (val?.conversation && (val?.conversation?.id === data.convParti?.conversationId)) {
                val.conversation.messages = [data.message]
            }
            if (!convParti || convParti?.conversation?.id !== data.convParti?.conversationId) {
                val.unreadCount = (val?.unreadCount || 0) + 1;
            }
            return val;
        }))
    }

    if (socket) {
        socket.on('message', messageReadFunc)
    }

    return () => {
        socket?.off("message")
    }
}


