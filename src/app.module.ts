import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { SocketGateway } from './socket.gateway';
import { SharedMongooseModule } from './shared/mongoose.module';
import { SocketModule } from './modules/socket/socket.module';
import { ConnectionModule } from './modules/connection/connection.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes the config available globally in your app
    }),
    ConnectionModule,
    SharedMongooseModule,
    SocketModule,
  ],
  controllers: [AppController],
  providers: [AppService, SocketGateway],
})
export class AppModule {}
