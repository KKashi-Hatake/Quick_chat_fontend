'use client'

import { VIDEO_CALL_STATES, VideoCallState } from '@/types/videoCall';
import React, { useEffect, useRef } from 'react';

type CallOverlayProps = {
    callState: VideoCallState;
    localStream: MediaStream | null;
    remoteStream: MediaStream | null;
    isMicMuted: boolean;
    isCameraOff: boolean;
    isMinimized: boolean;
    incomingCallerName: string | null;
    incomingCallerImage: string | null;
    onAccept: () => void | Promise<void>;
    onReject: () => void;
    onEnd: () => void;
    onToggleMic: () => void;
    onToggleCamera: () => void;
    onToggleMinimize: () => void;
};

const CallOverlay = ({
    callState,
    localStream,
    remoteStream,
    isMicMuted,
    isCameraOff,
    isMinimized,
    incomingCallerName,
    incomingCallerImage,
    onAccept,
    onReject,
    onEnd,
    onToggleMic,
    onToggleCamera,
    onToggleMinimize,
}: CallOverlayProps) => {
    const remoteVideoRef = useRef<HTMLVideoElement>(null);
    const localVideoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
        }
    }, [remoteStream]);

    useEffect(() => {
        if (localVideoRef.current) {
            localVideoRef.current.srcObject = localStream;
        }
    }, [localStream]);

    const showIncomingModal = callState === VIDEO_CALL_STATES.INCOMING;
    const showCallPanel =
        callState === VIDEO_CALL_STATES.OUTGOING ||
        callState === VIDEO_CALL_STATES.RINGING ||
        callState === VIDEO_CALL_STATES.CONNECTING ||
        callState === VIDEO_CALL_STATES.ACTIVE;

    if (!showIncomingModal && !showCallPanel) return null;

    return (
        <>
            {showIncomingModal && (
                <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
                    <div className="w-full max-w-sm bg-white rounded-xl shadow-xl p-5">
                        <h3 className="text-lg font-semibold text-gray-900">Incoming video call</h3>
                        <div className="flex items-center gap-3 mt-2">
                            {incomingCallerImage ? (
                                <img src={incomingCallerImage} alt={incomingCallerName || "Caller"} className="h-10 w-10 rounded-full object-cover" />
                            ) : (
                                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-xs text-gray-700">
                                    {(incomingCallerName || "U").slice(0, 1).toUpperCase()}
                                </div>
                            )}
                            <div>
                                <p className="text-sm font-medium text-gray-900">{incomingCallerName || "Unknown caller"}</p>
                                <p className="text-xs text-gray-500">Accept or reject the call.</p>
                            </div>
                        </div>
                        <div className="mt-4 flex gap-3 justify-end">
                            <button onClick={onReject} className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm">
                                Reject
                            </button>
                            <button onClick={onAccept} className="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white text-sm">
                                Accept
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showCallPanel && (
                <div
                    className={`fixed bg-black text-white shadow-xl ${
                        isMinimized
                            ? 'z-40 bottom-5 right-5 w-[420px] h-[320px] rounded-xl p-3'
                            : 'z-[100] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,960px)] h-[min(88vh,760px)] rounded-2xl p-4'
                    }`}
                >
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm capitalize">{callState}</p>
                        <button onClick={onToggleMinimize} className="text-xs px-2 py-1 rounded bg-white/10 hover:bg-white/20">
                            {isMinimized ? 'Expand' : 'Minimize'}
                        </button>
                    </div>

                    <div className={`relative ${isMinimized ? 'h-[220px]' : 'h-[calc(100%-72px)]'}`}>
                        <video
                            ref={remoteVideoRef}
                            autoPlay
                            playsInline
                            className="w-full h-full rounded-lg bg-gray-900 object-cover"
                        />
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className={`rounded-lg bg-gray-800 object-cover absolute border border-white/30 ${
                                isMinimized
                                    ? 'w-32 h-24 bottom-3 right-3'
                                    : 'w-40 h-28 bottom-4 right-4'
                            }`}
                        />
                    </div>

                    <div className="mt-3 grid grid-cols-3 gap-2">
                        <button onClick={onToggleMic} className="px-3 py-2 text-xs rounded bg-white/10 hover:bg-white/20">
                            {isMicMuted ? 'Unmute' : 'Mute'}
                        </button>
                        <button onClick={onToggleCamera} className="px-3 py-2 text-xs rounded bg-white/10 hover:bg-white/20">
                            {isCameraOff ? 'Camera On' : 'Camera Off'}
                        </button>
                        <button onClick={onEnd} className="px-3 py-2 text-xs rounded bg-red-600 hover:bg-red-700">
                            End
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default CallOverlay;
