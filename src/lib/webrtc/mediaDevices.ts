export const requestLocalMediaStream = async (): Promise<MediaStream> => {
    return navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
    });
};

export const stopMediaStreamTracks = (stream: MediaStream | null): void => {
    if (!stream) return;
    stream.getTracks().forEach((track) => track.stop());
};

export const setAudioEnabled = (stream: MediaStream | null, enabled: boolean): void => {
    if (!stream) return;
    stream.getAudioTracks().forEach((track) => {
        track.enabled = enabled;
    });
};

export const setVideoEnabled = (stream: MediaStream | null, enabled: boolean): void => {
    if (!stream) return;
    stream.getVideoTracks().forEach((track) => {
        track.enabled = enabled;
    });
};
