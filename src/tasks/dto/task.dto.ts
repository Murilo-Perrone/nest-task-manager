import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsDate } from 'class-validator';
import { TaskStatus } from '../task.entity';

// export enum TaskStatus {
//   PENDING = 'pending',
//   IN_PROGRESS = 'in progress',
//   CONCLUDED = 'concluded',
// }

export class CreateTaskDto {
  @ApiProperty({ description: 'The title of the task.' })
  @IsString()
  title: string;

  @ApiProperty({ description: 'The description of the task.' })
  @IsString()
  description: string;

  @ApiProperty({ description: 'The expiration date of the task.' })
  @IsDate()
  expirationDate: Date;

  @ApiProperty({ description: 'The name of the assigned user.' })
  @IsString()
  assignedUser: string;

  @ApiProperty({ description: 'The status of the task.', enum: TaskStatus })
  @IsEnum(TaskStatus)
  status: TaskStatus;
}

export class UpdateTaskDto {
  @ApiProperty({ description: 'The title of the task.', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ description: 'The description of the task.', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'The expiration date of the task.', required: false })
  @IsOptional()
  @IsDate()
  expirationDate?: Date;

  @ApiProperty({ description: 'The name of the assigned user.', required: false })
  @IsOptional()
  @IsString()
  assignedUser?: string;

  @ApiProperty({ description: 'The status of the task.', enum: TaskStatus, required: false })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
