import { Injectable } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectionService } from '../connection/connection.service';
import { ConnectionDto } from './dto/connection.dto';

@Injectable()
export class SocketService {
  private server: Server | undefined;

  constructor(private readonly connectionService: ConnectionService) {}

  setServer(server: Server) {
    this.server = server;
  }

  getServer(): Server {
    if (!this.server) {
      throw new Error('Socket server not initialized');
    }
    return this.server;
  }

  async emitToSocket(
    socketId: string,
    event: string,
    data: unknown,
  ): Promise<boolean> {
    const connection = await this.connectionService.findConnection(socketId);
    if (connection && connection.isActive) {
      this.getServer().to(socketId).emit(event, data);
      return true;
    }
    return false;
  }

  // Other methods remain unchanged...
}
