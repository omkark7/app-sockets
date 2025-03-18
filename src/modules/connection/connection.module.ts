import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConnectionService } from './connection.service';
import { Connection, ConnectionSchema } from './connection.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Connection.name, schema: ConnectionSchema },
    ]),
  ],
  providers: [ConnectionService],
  exports: [ConnectionService], // Export ConnectionService for use in other modules
})
export class ConnectionModule {}
