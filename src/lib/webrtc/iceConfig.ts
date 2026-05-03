import ENV from "../env";

export const WEBRTC_ICE_SERVERS: RTCIceServer[] = [
    {
        urls: ["stun:stun.l.google.com:19302"],
    },
];

if (ENV.TURN_URL && ENV.TURN_USERNAME && ENV.TURN_PASSWORD) {
    WEBRTC_ICE_SERVERS.push({
        urls: [ENV.TURN_URL],
        username: ENV.TURN_USERNAME,
        credential: ENV.TURN_PASSWORD,
    });
}

export const WEBRTC_PEER_CONFIG: RTCConfiguration = {
    iceServers: WEBRTC_ICE_SERVERS,
};
