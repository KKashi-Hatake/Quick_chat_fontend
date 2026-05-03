import { Socket } from "socket.io-client";
import {
    CallAcceptPayload,
    CallBusyPayload,
    CallCancelPayload,
    CallEndPayload,
    CallInvitePayload,
    CallRejectPayload,
    CallTimeoutPayload,
    IceCandidatePayload,
    SessionDescriptionPayload,
    VIDEO_CALL_EVENTS,
} from "@/types/videoCall";

type AttachCallSignalingListenersParams = {
    socket: Socket | null;
    getCurrentCallId?: () => string | null;
    onInvite: (payload: CallInvitePayload) => void | Promise<void>;
    onAccept: (payload: CallAcceptPayload) => void | Promise<void>;
    onReject: (payload: CallRejectPayload) => void | Promise<void>;
    onCancel: (payload: CallCancelPayload) => void | Promise<void>;
    onEnd: (payload: CallEndPayload) => void | Promise<void>;
    onBusy: (payload: CallBusyPayload) => void | Promise<void>;
    onTimeout: (payload: CallTimeoutPayload) => void | Promise<void>;
    onOffer: (payload: SessionDescriptionPayload) => void | Promise<void>;
    onAnswer: (payload: SessionDescriptionPayload) => void | Promise<void>;
    onIceCandidate: (payload: IceCandidatePayload) => void | Promise<void>;
};

const attachCallSignalingListeners = ({
    socket,
    getCurrentCallId,
    onInvite,
    onAccept,
    onReject,
    onCancel,
    onEnd,
    onBusy,
    onTimeout,
    onOffer,
    onAnswer,
    onIceCandidate,
}: AttachCallSignalingListenersParams): (() => void) => {
    if (!socket) return () => undefined;

    const shouldHandlePayload = (callId: string, allowWhenNoCurrent = true): boolean => {
        const currentCallId = getCurrentCallId?.() ?? null;
        if (!currentCallId) return allowWhenNoCurrent;
        return currentCallId === callId;
    };

    const inviteHandler = (payload: CallInvitePayload) => {
        onInvite(payload);
    };

    const acceptHandler = (payload: CallAcceptPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onAccept(payload);
    };

    const rejectHandler = (payload: CallRejectPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onReject(payload);
    };

    const cancelHandler = (payload: CallCancelPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onCancel(payload);
    };

    const endHandler = (payload: CallEndPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onEnd(payload);
    };

    const busyHandler = (payload: CallBusyPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onBusy(payload);
    };

    const timeoutHandler = (payload: CallTimeoutPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onTimeout(payload);
    };

    const offerHandler = (payload: SessionDescriptionPayload) => {
        if (!shouldHandlePayload(payload.callId)) return;
        onOffer(payload);
    };

    const answerHandler = (payload: SessionDescriptionPayload) => {
        if (!shouldHandlePayload(payload.callId, false)) return;
        onAnswer(payload);
    };

    const iceCandidateHandler = (payload: IceCandidatePayload) => {
        if (!shouldHandlePayload(payload.callId, false)) return;
        onIceCandidate(payload);
    };

    socket.on(VIDEO_CALL_EVENTS.INVITE, inviteHandler);
    socket.on(VIDEO_CALL_EVENTS.ACCEPT, acceptHandler);
    socket.on(VIDEO_CALL_EVENTS.REJECT, rejectHandler);
    socket.on(VIDEO_CALL_EVENTS.CANCEL, cancelHandler);
    socket.on(VIDEO_CALL_EVENTS.END, endHandler);
    socket.on(VIDEO_CALL_EVENTS.BUSY, busyHandler);
    socket.on(VIDEO_CALL_EVENTS.TIMEOUT, timeoutHandler);
    socket.on(VIDEO_CALL_EVENTS.OFFER, offerHandler);
    socket.on(VIDEO_CALL_EVENTS.ANSWER, answerHandler);
    socket.on(VIDEO_CALL_EVENTS.ICE_CANDIDATE, iceCandidateHandler);

    return () => {
        socket.off(VIDEO_CALL_EVENTS.INVITE, inviteHandler);
        socket.off(VIDEO_CALL_EVENTS.ACCEPT, acceptHandler);
        socket.off(VIDEO_CALL_EVENTS.REJECT, rejectHandler);
        socket.off(VIDEO_CALL_EVENTS.CANCEL, cancelHandler);
        socket.off(VIDEO_CALL_EVENTS.END, endHandler);
        socket.off(VIDEO_CALL_EVENTS.BUSY, busyHandler);
        socket.off(VIDEO_CALL_EVENTS.TIMEOUT, timeoutHandler);
        socket.off(VIDEO_CALL_EVENTS.OFFER, offerHandler);
        socket.off(VIDEO_CALL_EVENTS.ANSWER, answerHandler);
        socket.off(VIDEO_CALL_EVENTS.ICE_CANDIDATE, iceCandidateHandler);
    };
};

export default attachCallSignalingListeners;
