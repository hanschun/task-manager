import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Task as TaskModel } from '@prisma/client';
import { TaskService } from './task.service';
import { TaskDataDto } from './task.dto';
import * as dayjs from 'dayjs';
import { TaskStatus } from './types';

@Controller()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
  ) {}

  @Get('tasks')
  async getTasks(): Promise<TaskModel[]> {
    // return [
    //   { title: 'old', description: 'an old task', dueDate: dayjs().toISOString(), status: TaskStatus.Completed, id: 0} as TaskModel,
    //   { title: 'new', description: 'a new task', dueDate: dayjs().toISOString(), status: TaskStatus.New, id: 1} as TaskModel
    // ]
    return this.taskService.tasks({});
  }

  @Get('tasks/:id')
  async getTaskById(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.task({ id: Number(id) });
  }

  @Post('tasks')
  async createTask(
    @Body() taskData: TaskDataDto): Promise<TaskModel> {
    const { title, description, dueDate, status } = taskData;
    return this.taskService.createTask({
      title,
      description,
      dueDate,
      status,
    });
  }

  @Put('tasks/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() taskData: TaskDataDto,
  ): Promise<TaskModel> {
    return this.taskService.updateTask({
      where: { id: Number(id) },
      data: taskData,
    })
  }

  @Delete('tasks/:id')
  async deleteTask(@Param('id') id: string): Promise<TaskModel> {
    return this.taskService.deleteTask({ id: Number(id) });
  }
}
