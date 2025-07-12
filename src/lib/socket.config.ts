import { io, Socket } from "socket.io-client"
import ENV from "./env";


export interface CustomSocket extends Socket {
    auth: { room: string }
}


let socket: CustomSocket;

export const getSocket = (userId:string): CustomSocket => {
    if(!socket){
        socket = io(ENV.BACKEND_URL, {
				query: {
					userId,
				},autoConnect:false}) as CustomSocket;
    }
    return socket;
}