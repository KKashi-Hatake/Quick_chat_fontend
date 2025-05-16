import { io, Socket } from "socket.io-client"
import ENV from "./env";


export interface CustomSocket extends Socket {
    auth: { room: string }
}


let socket: CustomSocket;

export const getSocket = (): CustomSocket => {
    if(!socket){
        socket = io(ENV.BACKEND_URL, {autoConnect:false}) as CustomSocket;
    }
    return socket;
}