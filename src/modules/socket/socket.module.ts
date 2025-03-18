import { Module } from '@nestjs/common';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import { ConnectionModule } from '../connection/connection.module'; // Import ConnectionModule

@Module({
  imports: [ConnectionModule], // ConnectionModule provides ConnectionService
  providers: [SocketGateway, SocketService], // Remove ConnectionService from here
  exports: [SocketService],
})
export class SocketModule {}
