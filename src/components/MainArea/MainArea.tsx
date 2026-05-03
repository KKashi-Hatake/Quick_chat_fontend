'use client'



import React, { useEffect, useRef, useState } from 'react'
import HeroSection from '../HeroSection/HeroSection'
import { getSocket } from '@/lib/socket.config'
import { CustomUser } from '@/app/api/auth/[...nextauth]/options'
import { useStore } from '@/zustand/store'
import { getConversations } from '@/utils/apis/searchUser'
import SubSideBar from '../Sidebar/SubSideBar/SubSideBar'
import MainSideBar from '../Sidebar/MainSideBar/MainSideBar'
import { Socket } from 'socket.io-client'
import attachCallSignalingListeners from '@/utils/socketListeners/callSignaling.listener'
import { CallSession } from '@/lib/webrtc/callSession'
import { VIDEO_CALL_STATES, VideoCallState } from '@/types/videoCall'
import CallOverlay from './CallOverlay'

const MainArea = ({ user }: { user: CustomUser }) => {
    const setUser = useStore(state => state.setUser);
    const prevUser = useStore(state => state.user);
    const setSocket = useStore(state => state.setSocket);
    const socketRef = useRef<Socket | null>(null);
    const callSessionRef = useRef<CallSession | null>(null);
    const callStateRef = useRef<VideoCallState>(VIDEO_CALL_STATES.IDLE);
    const setConversation = useStore((state) => state.setConversations);
    const setCallState = useStore(state => state.setCallState);
    const setCallId = useStore(state => state.setCallId);
    const setLocalStream = useStore(state => state.setLocalStream);
    const setRemoteStream = useStore(state => state.setRemoteStream);
    const setMicMuted = useStore(state => state.setMicMuted);
    const setCameraOff = useStore(state => state.setCameraOff);
    const isMicMuted = useStore(state => state.isMicMuted);
    const isCameraOff = useStore(state => state.isCameraOff);
    const isCallMinimized = useStore(state => state.isCallMinimized);
    const setCallMinimized = useStore(state => state.setCallMinimized);
    const setIncomingCaller = useStore(state => state.setIncomingCaller);
    const callState = useStore(state => state.callState);
    const localStream = useStore(state => state.localStream);
    const remoteStream = useStore(state => state.remoteStream);
    const incomingCallerName = useStore(state => state.incomingCallerName);
    const incomingCallerImage = useStore(state => state.incomingCallerImage);
    const setCallControls = useStore(state => state.setCallControls);
    const resetCallRuntime = useStore(state => state.resetCallRuntime);
    const [convTrigger, setConvTrigger] = useState(false);



    useEffect(() => {
        if (user) {
            if (JSON.stringify(prevUser) !== JSON.stringify(user)) {
                setUser(user);
            } else {
                setUser(prevUser);
            }
        }
    }, [user]);

    useEffect(() => {
        const getConv = async () => {
            const res = await getConversations();
            setConversation(res);
        }
        getConv();
    }, [convTrigger])

    useEffect(() => {
        if (!user?.id) return;

        const socket = getSocket(user.id);
        socketRef.current = socket;
        setSocket(socket);

        const newConv = (data: any) => {
            setConvTrigger(!convTrigger);
            if (socket) {
                socket.emit('message:delivered', { receiver: data.convParti.id, conversation: data.convParti.conversationId, receiverId: data.convParti.userId });
            } else {
                console.log("Socket not found while triggering event to mark message as delivered.")
            }
        }



        socket.on('newConv', newConv);
        socket.on('disconnect', () => {
            callSessionRef.current?.handleSocketDisconnected();
        });

        const callSession = new CallSession({
            socket,
            userId: user.id,
            store: {
                setCallState: (state) => {
                    callStateRef.current = state;
                    setCallState(state);
                },
                setCallId,
                setLocalStream,
                setRemoteStream,
                setMicMuted,
                setCameraOff,
                resetCallRuntime,
            },
        });
        callSessionRef.current = callSession;

        setCallControls({
            startVideoCall: async (targetUserId: string, conversationId?: string) => {
                const payload = {
                    callId: crypto.randomUUID(),
                    fromUserId: user.id,
                    toUserId: targetUserId,
                    timestamp: Date.now(),
                    callType: "video" as const,
                    conversationId,
                    callerName: user.name,
                    callerImage: user.image,
                };
                await callSession.startOutgoingCall(payload);
            },
            acceptIncomingCall: async () => {
                await callSession.acceptIncomingCall();
            },
            rejectIncomingCall: () => {
                callSession.rejectIncomingCall();
            },
            endCall: () => {
                if (callStateRef.current === VIDEO_CALL_STATES.OUTGOING) {
                    callSession.cancelOutgoingCall();
                    return;
                }
                callSession.endCall("ended_by_user");
            },
            toggleMic: () => {
                const currentMuted = useStore.getState().isMicMuted;
                callSession.setMicMuted(!currentMuted);
            },
            toggleCamera: () => {
                const currentCameraOff = useStore.getState().isCameraOff;
                callSession.setCameraOff(!currentCameraOff);
            },
        });

        const removeCallSignaling = attachCallSignalingListeners({
            socket,
            getCurrentCallId: () => useStore.getState().callId,
            onInvite: async (payload) => {
                if (
                    callStateRef.current === VIDEO_CALL_STATES.ACTIVE ||
                    callStateRef.current === VIDEO_CALL_STATES.CONNECTING ||
                    callStateRef.current === VIDEO_CALL_STATES.OUTGOING ||
                    callStateRef.current === VIDEO_CALL_STATES.RINGING
                ) {
                    return;
                }
                callSession.onIncomingInvite(payload);
                setIncomingCaller(payload.callerName || payload.callerPhone || "Unknown caller", payload.callerImage || null);
            },
            onAccept: async (payload) => {
                await callSession.onOutgoingAccepted(payload);
            },
            onReject: async () => {
                callSession.cleanup(VIDEO_CALL_STATES.IDLE);
            },
            onCancel: async () => {
                callSession.cleanup(VIDEO_CALL_STATES.IDLE);
            },
            onEnd: async () => {
                callSession.cleanup(VIDEO_CALL_STATES.IDLE);
            },
            onBusy: async () => {
                callSession.cleanup(VIDEO_CALL_STATES.IDLE);
            },
            onTimeout: async () => {
                callSession.cleanup(VIDEO_CALL_STATES.IDLE);
            },
            onOffer: async (payload) => {
                await callSession.handleOffer(payload);
            },
            onAnswer: async (payload) => {
                await callSession.handleAnswer(payload);
            },
            onIceCandidate: async (payload) => {
                await callSession.handleIceCandidate(payload);
            },
        });

        const beforeUnloadHandler = () => {
            callSession.handleBeforeUnload();
        };
        window.addEventListener("beforeunload", beforeUnloadHandler);

        return () => {
            window.removeEventListener("beforeunload", beforeUnloadHandler);
            removeCallSignaling();
            callSession.cleanup(VIDEO_CALL_STATES.ENDED);
            setIncomingCaller(null, null);
            setCallControls({
                startVideoCall: async () => undefined,
                acceptIncomingCall: async () => undefined,
                rejectIncomingCall: () => undefined,
                endCall: () => undefined,
                toggleMic: () => undefined,
                toggleCamera: () => undefined,
            });
            callSessionRef.current = null;
            socket?.off("newConv")
            socket?.off("disconnect")
            socket.close()
        }
    }, [user.id]);


    return (
        <div className="w-[748px] md:w-full h-full flex">
            {/* SubSidebar */}
            <SubSideBar />
            {/* main side bar */}
            <MainSideBar />



            {/* Hero Section */}
            <HeroSection />

            <CallOverlay
                callState={callState}
                localStream={localStream}
                remoteStream={remoteStream}
                isMicMuted={isMicMuted}
                isCameraOff={isCameraOff}
                isMinimized={isCallMinimized}
                incomingCallerName={incomingCallerName}
                incomingCallerImage={incomingCallerImage}
                onAccept={() => useStore.getState().callControls.acceptIncomingCall()}
                onReject={() => useStore.getState().callControls.rejectIncomingCall()}
                onEnd={() => useStore.getState().callControls.endCall()}
                onToggleMic={() => useStore.getState().callControls.toggleMic()}
                onToggleCamera={() => useStore.getState().callControls.toggleCamera()}
                onToggleMinimize={() => setCallMinimized(!isCallMinimized)}
            />

        </div>
    )
}

export default MainArea
