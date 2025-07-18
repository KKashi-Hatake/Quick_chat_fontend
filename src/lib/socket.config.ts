// socket.ts
import { io, Socket } from 'socket.io-client';
import ENV from './env';

let socket: Socket | null = null;

export const getSocket = (userId: string): Socket => {
    if (!socket) {
        socket = io(ENV.BACKEND_URL, {
            query: { userId },
            autoConnect: false,
            transports: ['websocket'], // Optional: forces WS over polling
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
        });

        socket.on('connect', () => {
            console.log('✅ Socket connected:', socket?.id);
            // socket?.emit('register', { userId }); // Optional explicit registration
        });

        socket.on('disconnect', (reason) => {
            console.log('⚠️ Socket disconnected:', reason);
        });
    }

    if (!socket.connected) {
        socket.connect();
    }

    return socket;
};
