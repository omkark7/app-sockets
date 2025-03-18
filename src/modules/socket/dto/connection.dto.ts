import { IsString, IsBoolean, IsDate, IsOptional } from 'class-validator';

export class ConnectionDto {
  @IsString()
  socketId: string;

  @IsString()
  userId: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsDate()
  @IsOptional()
  lastActive?: Date;
}
