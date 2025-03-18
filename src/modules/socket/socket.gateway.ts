import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayInit,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';
import { ConnectionService } from '../connection/connection.service';
import { SocketService } from './socket.service';
import { ISocketConnection } from './interfaces/socket.interface';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  private readonly logger = new Logger(SocketGateway.name);
  private connections: Map<string, ISocketConnection> = new Map();

  constructor(
    private connectionService: ConnectionService,
    private socketService: SocketService,
  ) {}

  afterInit() {
    this.logger.log('WebSocket server initialized');
    this.socketService.setServer(this.server);
  }

  async handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    await this.connectionService.createConnection(client.id, userId);
    this.connections.set(client.id, {
      socket: client,
      userId,
      connectedAt: new Date(),
    });
    this.logger.log(`Client connected: ${client.id} (userId: ${userId})`);
  }

  async handleDisconnect(client: Socket) {
    await this.connectionService.removeConnection(client.id);
    this.connections.delete(client.id);
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('test')
  handleTestEvent(client: Socket, payload: string): void {
    this.logger.log(`Received test event from ${client.id}: ${payload}`);
    client.emit('testResponse', `Echo: ${payload}`);
  }

  getConnection(socketId: string): ISocketConnection | undefined {
    return this.connections.get(socketId);
  }
}
