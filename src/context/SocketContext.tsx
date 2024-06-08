import { createContext } from 'react';
import { Socket } from 'socket.io-client';

export const SocketContext = createContext<{
    socket: Socket;
    // eslint-disable-next-line no-unused-vars
    setSocket: (socket: Socket) => void;
}>(null);
