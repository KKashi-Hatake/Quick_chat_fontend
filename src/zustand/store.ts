import { create } from 'zustand'
import { ConversationParticipantType, MessageType, StoreType, User } from "../../types"
import { Socket } from 'socket.io-client'
import { VIDEO_CALL_STATES, VideoCallState } from '@/types/videoCall'


export const useStore = create<StoreType>((set) => ({
    user: null,
    convParti: null,
    conversations: null,
    message: null,
    messageIds: null,
    socket: null,
    callState: VIDEO_CALL_STATES.IDLE,
    callId: null,
    localStream: null,
    remoteStream: null,
    isMicMuted: false,
    isCameraOff: false,
    isCallMinimized: false,
    incomingCallerName: null,
    incomingCallerImage: null,
    callControls: {
        startVideoCall: async () => undefined,
        acceptIncomingCall: async () => undefined,
        rejectIncomingCall: () => undefined,
        endCall: () => undefined,
        toggleMic: () => undefined,
        toggleCamera: () => undefined,
    },

    setSocket: (newSocket: Socket) => set({ socket: newSocket }),
    setMessage: (newMessage: Map<string, MessageType>) => set({ message: newMessage }),
    setMessageIds: (newMessageIds: string[] ) => set({ messageIds: newMessageIds }),
    setConvParti: (newConvParti: ConversationParticipantType) => set({ convParti: newConvParti }),
    setUser: (newUser: User) => set({ user: newUser }),
    setConversations: (newCoversations: ConversationParticipantType[]) => set({ conversations: newCoversations }),
    setCallState: (newCallState: VideoCallState) => set({ callState: newCallState }),
    setCallId: (newCallId: string | null) => set({ callId: newCallId }),
    setLocalStream: (stream: MediaStream | null) => set({ localStream: stream }),
    setRemoteStream: (stream: MediaStream | null) => set({ remoteStream: stream }),
    setMicMuted: (value: boolean) => set({ isMicMuted: value }),
    setCameraOff: (value: boolean) => set({ isCameraOff: value }),
    setCallMinimized: (value: boolean) => set({ isCallMinimized: value }),
    setIncomingCaller: (name: string | null, image: string | null) => set({ incomingCallerName: name, incomingCallerImage: image }),
    setCallControls: (controls) => set({ callControls: controls }),
    resetCallRuntime: () => set({
        callState: VIDEO_CALL_STATES.IDLE,
        callId: null,
        localStream: null,
        remoteStream: null,
        isMicMuted: false,
        isCameraOff: false,
        isCallMinimized: false,
        incomingCallerName: null,
        incomingCallerImage: null,
    }),
}))
