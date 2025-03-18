import {
  WebSocketGateway,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ namespace: '/events' })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server; // Non-null assertion since NestJS initializes it

  private readonly logger = new Logger(SocketGateway.name); // Class-level logger

  afterInit(server: Server) {
    this.logger.log('WebSocket server initialized!');
  }

  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  handleCustomEvent(client: Socket, data: string): void {
    this.logger.log(`Received data from ${client.id}: ${data}`);
    client.emit('message', 'Hello from server!');
  }

  broadcastMessage(message: string) {
    this.logger.log(`Broadcasting message: ${message}`);
    this.server.emit('message', message);
  }
}
