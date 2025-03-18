import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Connection extends Document {
  @Prop({ required: true, unique: true })
  socketId: string;

  @Prop({ required: true })
  userId: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop()
  lastActive: Date;
}

export const ConnectionSchema = SchemaFactory.createForClass(Connection);
