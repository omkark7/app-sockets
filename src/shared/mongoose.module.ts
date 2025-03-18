import { Module, Logger } from '@nestjs/common';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { databaseConfig } from '../config/database.config';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: (): MongooseModuleOptions => {
        return {
          uri: databaseConfig.uri,
          // Optional: Add connection event listeners
          connectionFactory: (connection: Connection) => {
            const logger = new Logger('MongooseModule');

            connection.on('connected', () => {
              logger.log('MongoDB connected successfully');
            });

            connection.on('error', (error) => {
              logger.error('MongoDB connection error:', error);
            });

            connection.on('disconnected', () => {
              logger.warn('MongoDB disconnected');
            });

            return connection;
          },
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class SharedMongooseModule {}
