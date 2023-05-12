import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { PrismaService } from '../database/prisma.service';
import { TaskService } from './task.service';

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [PrismaService, TaskService],
})
export class TaskModule {}
