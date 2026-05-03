import { Socket } from "socket.io-client";
import {
    SessionDescriptionPayload,
    IceCandidatePayload,
    VIDEO_CALL_EVENTS,
} from "@/types/videoCall";

type AttachCallWebRtcListenersParams = {
    socket: Socket | null;
    onOffer: (payload: SessionDescriptionPayload) => void | Promise<void>;
    onAnswer: (payload: SessionDescriptionPayload) => void | Promise<void>;
    onIceCandidate: (payload: IceCandidatePayload) => void | Promise<void>;
};

const attachCallWebRtcListeners = ({
    socket,
    onOffer,
    onAnswer,
    onIceCandidate,
}: AttachCallWebRtcListenersParams): (() => void) => {
    if (!socket) return () => undefined;

    socket.on(VIDEO_CALL_EVENTS.OFFER, onOffer);
    socket.on(VIDEO_CALL_EVENTS.ANSWER, onAnswer);
    socket.on(VIDEO_CALL_EVENTS.ICE_CANDIDATE, onIceCandidate);

    return () => {
        socket.off(VIDEO_CALL_EVENTS.OFFER, onOffer);
        socket.off(VIDEO_CALL_EVENTS.ANSWER, onAnswer);
        socket.off(VIDEO_CALL_EVENTS.ICE_CANDIDATE, onIceCandidate);
    };
};

export default attachCallWebRtcListeners;
