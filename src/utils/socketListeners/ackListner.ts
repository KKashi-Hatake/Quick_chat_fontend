import { Socket } from "socket.io-client";
import { ConversationParticipantType, MessageType, StoreType, User } from "../../../types";



type paramsType = {
    user: User | null,
    socket: Socket | null;
    message: Map<string, MessageType> | null;
    messageIds: string[] | null;
    setMessage: Function;
    setMessageIds: Function;
    setConversation: Function;
    convParti: ConversationParticipantType | null;
    conversation: ConversationParticipantType[] | null;
}

export default function ackListener({
    user,
    socket,
    message,
    setMessage,
    messageIds,
    setMessageIds,
    setConversation,
    convParti,
    conversation
}: paramsType) {
    const messageReadBatch = (data: { convId: string }) => {
        const { convId = "" } = data;
        if (convParti && convId && messageIds) {
            if (convParti?.conversation?.id === convId) {
                let tempMap: Map<string, MessageType> | null = new Map(message);
                messageIds.forEach((val, i) => {
                    let msg = tempMap?.get(val) || null;
                    if (msg && user && msg.sender.userId === user.id) {
                        tempMap?.set(val, { ...msg, MessageStatus: { ...msg.MessageStatus, status: 'read' } })
                    }
                })
                setMessage(tempMap)
            }
        }

        setConversation(conversation?.map(val => {
            if (val?.conversation?.id === convId && val?.conversation?.messages) {
                val.conversation.messages[0].MessageStatus.status = 'read';
            }
            return val;
        }))
    }

    const messageReadConfirm = (data: { convId: string }) => {
        const { convId = "" } = data;
        setConversation(conversation?.map(val => {
            if (val?.conversation?.id === convId) {
                let { unreadCount, ...data } = val;
                return data;
            }
            return val;
        }))
    }

    const messageDelivered = (data: { id?: string, convId?: string }) => {
        const { convId = "" } = data;
        if (convParti && convId && messageIds) {
            if (convParti?.conversation?.id === convId) {
                let tempMap: Map<string, MessageType> | null = new Map(message);
                messageIds.forEach((val, i) => {
                    let msg = tempMap?.get(val) || null;
                    if (msg && user && msg.sender.userId === user.id) {
                        tempMap?.set(val, { ...msg, MessageStatus: { ...msg.MessageStatus, status: msg.MessageStatus.status === 'sent' ? 'delivered' : msg.MessageStatus.status } })
                    }
                })
                setMessage(tempMap)
            }
        }

        setConversation(conversation?.map(val => {
            if (val?.conversation?.id === convId && val?.conversation?.messages) {
                val.conversation.messages[0].MessageStatus.status = 'delivered';
            }
            return val;
        }))
    }




    if (socket) {
        socket.on('ack:message:read:batch', messageReadBatch) // listening an event which marks all the unread messages as read if the use selects the a conversation
        socket.on('message:read:confirmation', messageReadConfirm) // listening an event which tells that all the messages that you have sent is read by the receiver
        socket.on("ack:message:delivered", messageDelivered)
    }
    return () => {
        socket?.off("ack:message:read:batch")
        socket?.off("message:read:confirmation")
        socket?.off("ack:message:delivered")

    }
}
