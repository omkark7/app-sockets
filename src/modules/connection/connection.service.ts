import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Connection } from './connection.schema';
import { ConnectionDto } from '../socket/dto/connection.dto';

@Injectable()
export class ConnectionService {
  constructor(
    @InjectModel(Connection.name) private connectionModel: Model<Connection>,
  ) {}

  async createConnection(
    socketId: string,
    userId: string,
  ): Promise<Connection> {
    const connection = new this.connectionModel({ socketId, userId });
    return connection.save();
  }

  async updateConnection(
    socketId: string,
    updates: ConnectionDto,
  ): Promise<Connection | null> {
    return this.connectionModel.findOneAndUpdate(
      { socketId },
      { ...updates, lastActive: new Date() },
      { new: true },
    );
  }

  async deactivateConnection(socketId: string): Promise<Connection | null> {
    return this.connectionModel.findByIdAndDelete(
      { socketId },
      { isActive: false, lastActive: new Date() },
    );
  }

  async removeConnection(socketId: string): Promise<Connection | null> {
    return this.connectionModel.findOneAndDelete({ socketId });
  }

  async findConnection(socketId: string): Promise<Connection | null> {
    return this.connectionModel.findOne({ socketId });
  }

  async getAllActiveConnections(): Promise<Connection[]> {
    return this.connectionModel
      .find({ isActive: true })
      .select('socketId')
      .exec();
  }
}
