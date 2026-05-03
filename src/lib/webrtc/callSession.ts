import { Socket } from "socket.io-client";
import { CallPeer } from "./callPeer";
import {
    requestLocalMediaStream,
    setAudioEnabled,
    setVideoEnabled,
    stopMediaStreamTracks,
} from "./mediaDevices";
import {
    CallCancelPayload,
    CallAcceptPayload,
    CallEndPayload,
    CallInvitePayload,
    CallRejectPayload,
    IceCandidatePayload,
    SessionDescriptionPayload,
    VIDEO_CALL_EVENTS,
    VIDEO_CALL_TIMEOUT_MS,
    VIDEO_CALL_STATES,
    VideoCallState,
} from "@/types/videoCall";

type CallStoreApi = {
    setCallState: (state: VideoCallState) => void;
    setCallId: (callId: string | null) => void;
    setLocalStream: (stream: MediaStream | null) => void;
    setRemoteStream: (stream: MediaStream | null) => void;
    setMicMuted: (value: boolean) => void;
    setCameraOff: (value: boolean) => void;
    resetCallRuntime: () => void;
};

type CallSessionParams = {
    socket: Socket;
    userId: string;
    store: CallStoreApi;
};

export class CallSession {
    private socket: Socket;
    private userId: string;
    private store: CallStoreApi;
    private peer: CallPeer | null = null;
    private localStream: MediaStream | null = null;
    private callId: string | null = null;
    private remoteUserId: string | null = null;
    private inviteTimeout: ReturnType<typeof setTimeout> | null = null;
    private handledOfferCallIds: Set<string> = new Set();
    private handledAnswerCallIds: Set<string> = new Set();
    private hasEmittedTerminalEvent = false;
    private isCleaningUp = false;

    constructor({ socket, userId, store }: CallSessionParams) {
        this.socket = socket;
        this.userId = userId;
        this.store = store;
    }

    private ensurePeer(): CallPeer {
        if (!this.peer) {
            this.peer = new CallPeer({
                onIceCandidate: (candidate) => {
                    if (!this.callId || !this.remoteUserId) return;
                    const payload: IceCandidatePayload = {
                        callId: this.callId,
                        fromUserId: this.userId,
                        toUserId: this.remoteUserId,
                        timestamp: Date.now(),
                        candidate: candidate.toJSON(),
                    };
                    this.socket.emit(VIDEO_CALL_EVENTS.ICE_CANDIDATE, payload);
                },
                onRemoteTrack: (stream) => {
                    this.store.setRemoteStream(stream);
                },
                onConnectionStateChange: (state) => {
                    if (state === "connected") {
                        this.store.setCallState(VIDEO_CALL_STATES.ACTIVE);
                    }
                    if (state === "failed" || state === "disconnected" || state === "closed") {
                        this.cleanup(VIDEO_CALL_STATES.FAILED);
                    }
                },
            });
        }

        return this.peer;
    }

    private async ensureLocalStream(): Promise<MediaStream> {
        if (this.localStream) return this.localStream;
        this.localStream = await requestLocalMediaStream();
        this.store.setLocalStream(this.localStream);
        return this.localStream;
    }

    public async startOutgoingCall(payload: CallInvitePayload): Promise<void> {
        this.clearInviteTimeout();
        this.callId = payload.callId;
        this.remoteUserId = payload.toUserId;
        this.hasEmittedTerminalEvent = false;
        this.store.setCallId(payload.callId);
        this.store.setCallState(VIDEO_CALL_STATES.OUTGOING);
        // Match WhatsApp behavior: enable local camera/mic immediately after call starts.
        await this.ensureLocalStream();
        this.socket.emit(VIDEO_CALL_EVENTS.INVITE, payload);
        this.startInviteTimeout(payload);
    }

    public onIncomingInvite(payload: CallInvitePayload): void {
        this.clearInviteTimeout();
        this.callId = payload.callId;
        this.remoteUserId = payload.fromUserId;
        this.hasEmittedTerminalEvent = false;
        this.store.setCallId(payload.callId);
        this.store.setCallState(VIDEO_CALL_STATES.INCOMING);
    }

    public async onOutgoingAccepted(payload: CallAcceptPayload): Promise<void> {
        if (!this.shouldProcessForCurrentCall(payload.callId)) return;
        if (!this.remoteUserId) return;
        this.clearInviteTimeout();
        const stream = await this.ensureLocalStream();
        const peer = this.ensurePeer();
        peer.init(stream);
        const offer = await peer.createOffer();

        const offerPayload: SessionDescriptionPayload = {
            callId: payload.callId,
            fromUserId: this.userId,
            toUserId: this.remoteUserId,
            timestamp: Date.now(),
            sdp: offer,
        };

        this.store.setCallState(VIDEO_CALL_STATES.CONNECTING);
        this.socket.emit(VIDEO_CALL_EVENTS.OFFER, offerPayload);
    }

    public async acceptIncomingCall(): Promise<void> {
        if (!this.callId || !this.remoteUserId) return;
        this.clearInviteTimeout();
        const payload: CallAcceptPayload = {
            callId: this.callId,
            fromUserId: this.userId,
            toUserId: this.remoteUserId,
            timestamp: Date.now(),
        };
        this.store.setCallState(VIDEO_CALL_STATES.CONNECTING);
        this.socket.emit(VIDEO_CALL_EVENTS.ACCEPT, payload);
    }

    public rejectIncomingCall(reason = "rejected"): void {
        if (!this.callId || !this.remoteUserId) return;
        this.hasEmittedTerminalEvent = true;
        const payload: CallRejectPayload = {
            callId: this.callId,
            fromUserId: this.userId,
            toUserId: this.remoteUserId,
            timestamp: Date.now(),
            reason,
        };
        this.socket.emit(VIDEO_CALL_EVENTS.REJECT, payload);
        this.cleanup(VIDEO_CALL_STATES.REJECTED);
    }

    public cancelOutgoingCall(reason = "cancelled"): void {
        if (!this.callId || !this.remoteUserId) return;
        this.hasEmittedTerminalEvent = true;
        const payload: CallCancelPayload = {
            callId: this.callId,
            fromUserId: this.userId,
            toUserId: this.remoteUserId,
            timestamp: Date.now(),
        };
        this.socket.emit(VIDEO_CALL_EVENTS.CANCEL, payload);
        this.cleanup(VIDEO_CALL_STATES.CANCELLED);
    }

    public async handleOffer(payload: SessionDescriptionPayload): Promise<void> {
        if (!this.shouldProcessForCurrentCall(payload.callId)) return;
        if (this.handledOfferCallIds.has(payload.callId)) return;
        this.handledOfferCallIds.add(payload.callId);

        this.callId = payload.callId;
        this.remoteUserId = payload.fromUserId;
        this.store.setCallId(payload.callId);
        this.store.setCallState(VIDEO_CALL_STATES.CONNECTING);

        const stream = await this.ensureLocalStream();
        const peer = this.ensurePeer();
        peer.init(stream);
        await peer.setRemoteDescription(payload.sdp);
        const answer = await peer.createAnswer();

        const answerPayload: SessionDescriptionPayload = {
            callId: payload.callId,
            fromUserId: this.userId,
            toUserId: payload.fromUserId,
            timestamp: Date.now(),
            sdp: answer,
        };

        this.socket.emit(VIDEO_CALL_EVENTS.ANSWER, answerPayload);
    }

    public async handleAnswer(payload: SessionDescriptionPayload): Promise<void> {
        if (!this.shouldProcessForCurrentCall(payload.callId)) return;
        if (this.handledAnswerCallIds.has(payload.callId)) return;
        this.handledAnswerCallIds.add(payload.callId);
        if (!this.peer) return;
        await this.peer.setRemoteDescription(payload.sdp);
        this.store.setCallState(VIDEO_CALL_STATES.ACTIVE);
    }

    public async handleIceCandidate(payload: IceCandidatePayload): Promise<void> {
        if (!this.shouldProcessForCurrentCall(payload.callId)) return;
        if (!this.peer) return;
        await this.peer.addIceCandidate(payload.candidate);
    }

    public setMicMuted(value: boolean): void {
        setAudioEnabled(this.localStream, !value);
        this.store.setMicMuted(value);
    }

    public setCameraOff(value: boolean): void {
        setVideoEnabled(this.localStream, !value);
        this.store.setCameraOff(value);
    }

    public endCall(reason?: string): void {
        if (this.callId && this.remoteUserId) {
            this.hasEmittedTerminalEvent = true;
            const payload: CallEndPayload = {
                callId: this.callId,
                fromUserId: this.userId,
                toUserId: this.remoteUserId,
                timestamp: Date.now(),
                reason,
            };
            this.socket.emit(VIDEO_CALL_EVENTS.END, payload);
        }
        this.cleanup(VIDEO_CALL_STATES.ENDED);
    }

    public handleSocketDisconnected(): void {
        if (!this.callId) return;
        this.cleanup(VIDEO_CALL_STATES.FAILED);
    }

    public handleBeforeUnload(): void {
        if (!this.callId || !this.remoteUserId || this.hasEmittedTerminalEvent) return;
        this.hasEmittedTerminalEvent = true;
        const payload: CallEndPayload = {
            callId: this.callId,
            fromUserId: this.userId,
            toUserId: this.remoteUserId,
            timestamp: Date.now(),
            reason: "page_unload",
        };
        this.socket.emit(VIDEO_CALL_EVENTS.END, payload);
    }

    private startInviteTimeout(payload: CallInvitePayload): void {
        this.clearInviteTimeout();
        this.inviteTimeout = setTimeout(() => {
            if (!this.shouldProcessForCurrentCall(payload.callId)) return;
            this.hasEmittedTerminalEvent = true;
            this.socket.emit(VIDEO_CALL_EVENTS.TIMEOUT, {
                callId: payload.callId,
                fromUserId: payload.fromUserId,
                toUserId: payload.toUserId,
                timestamp: Date.now(),
            });
            this.cleanup(VIDEO_CALL_STATES.MISSED);
        }, VIDEO_CALL_TIMEOUT_MS);
    }

    private clearInviteTimeout(): void {
        if (!this.inviteTimeout) return;
        clearTimeout(this.inviteTimeout);
        this.inviteTimeout = null;
    }

    private shouldProcessForCurrentCall(callId: string): boolean {
        if (!this.callId) return true;
        return this.callId === callId;
    }

    public cleanup(finalState: VideoCallState = VIDEO_CALL_STATES.IDLE): void {
        if (this.isCleaningUp) return;
        this.isCleaningUp = true;
        this.clearInviteTimeout();
        if (this.peer) {
            this.peer.destroy();
            this.peer = null;
        }
        stopMediaStreamTracks(this.localStream);
        this.localStream = null;
        this.callId = null;
        this.remoteUserId = null;
        this.handledOfferCallIds.clear();
        this.handledAnswerCallIds.clear();
        this.store.resetCallRuntime();
        this.store.setCallState(finalState);
        this.isCleaningUp = false;
    }
}
