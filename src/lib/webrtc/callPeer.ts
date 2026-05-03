import { WEBRTC_PEER_CONFIG } from "./iceConfig";

type OnIceCandidate = (candidate: RTCIceCandidate) => void;
type OnRemoteTrack = (stream: MediaStream) => void;
type OnConnectionStateChange = (state: RTCPeerConnectionState) => void;

export class CallPeer {
    private peerConnection: RTCPeerConnection | null = null;
    private remoteStream: MediaStream | null = null;
    private onIceCandidate: OnIceCandidate;
    private onRemoteTrack: OnRemoteTrack;
    private onConnectionStateChange: OnConnectionStateChange;

    constructor(params: {
        onIceCandidate: OnIceCandidate;
        onRemoteTrack: OnRemoteTrack;
        onConnectionStateChange?: OnConnectionStateChange;
    }) {
        this.onIceCandidate = params.onIceCandidate;
        this.onRemoteTrack = params.onRemoteTrack;
        this.onConnectionStateChange = params.onConnectionStateChange ?? (() => undefined);
    }

    public init(localStream: MediaStream): RTCPeerConnection {
        this.destroy();
        const connection = new RTCPeerConnection(WEBRTC_PEER_CONFIG);
        this.peerConnection = connection;
        this.remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
            connection.addTrack(track, localStream);
        });

        connection.onicecandidate = (event) => {
            if (event.candidate) {
                this.onIceCandidate(event.candidate);
            }
        };

        connection.ontrack = (event) => {
            if (!this.remoteStream) {
                this.remoteStream = new MediaStream();
            }
            event.streams[0]?.getTracks().forEach((track) => {
                this.remoteStream?.addTrack(track);
            });
            this.onRemoteTrack(this.remoteStream);
        };

        connection.onconnectionstatechange = () => {
            this.onConnectionStateChange(connection.connectionState);
        };

        return connection;
    }

    public getConnection(): RTCPeerConnection {
        if (!this.peerConnection) {
            throw new Error("Peer connection is not initialized.");
        }
        return this.peerConnection;
    }

    public async createOffer(): Promise<RTCSessionDescriptionInit> {
        const pc = this.getConnection();
        const offer = await pc.createOffer();
        await pc.setLocalDescription(offer);
        return offer;
    }

    public async createAnswer(): Promise<RTCSessionDescriptionInit> {
        const pc = this.getConnection();
        const answer = await pc.createAnswer();
        await pc.setLocalDescription(answer);
        return answer;
    }

    public async setRemoteDescription(sdp: RTCSessionDescriptionInit): Promise<void> {
        await this.getConnection().setRemoteDescription(new RTCSessionDescription(sdp));
    }

    public async addIceCandidate(candidate: RTCIceCandidateInit): Promise<void> {
        await this.getConnection().addIceCandidate(new RTCIceCandidate(candidate));
    }

    public destroy(): void {
        if (this.peerConnection) {
            this.peerConnection.onicecandidate = null;
            this.peerConnection.ontrack = null;
            this.peerConnection.onconnectionstatechange = null;
            this.peerConnection.getSenders().forEach((sender) => sender.track?.stop());
            this.peerConnection.close();
            this.peerConnection = null;
        }
        this.remoteStream = null;
    }
}
