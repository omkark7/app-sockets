import { Socket } from 'socket.io';

export interface ISocketConnection {
  socket: Socket;
  userId: string;
  connectedAt: Date;
}
