import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '@prisma/client';
import * as dayjs from 'dayjs';
import { TaskController } from './task.controller';
import { PrismaService } from '../database/prisma.service';
import { TaskDataDto } from './task.dto';
import { TaskService } from './task.service';
import { TaskStatus } from './types';

describe('TaskController', () => {
  let app: TestingModule;
  let taskController: TaskController;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [TaskController],
      providers: [PrismaService, TaskService],
    }).compile();
  });

  beforeEach(() => {
    taskController = app.get(TaskController);
  });

  const existingId = '10';
  const existingTask: Task = {
    id: Number(existingId),
    title: 'Test task',
    description: 'Test task by id route',
    dueDate: dayjs().toISOString(),
    status: TaskStatus.New,
    userId: null,
  };

  describe('getTasks', () => {
    it('should return an empty array of tasks', async () => {
      const tasks = await taskController.getTasks();
      expect(tasks).toEqual([]);
    });

    it('should return array of tasks if they exist', async () => {
      jest.spyOn(TaskService.prototype, 'tasks').mockResolvedValue([existingTask]);
      const tasks = await taskController.getTasks();
      expect(tasks).toEqual([existingTask]);
    });
  });

  describe('getTaskById', () => {
    it('should return null when no task is found by id', async () => {
      const task = await taskController.getTaskById('01');
      expect(task).toBeNull();
    });

    it('should return task when task is found by id', async () => {
      jest.spyOn(TaskService.prototype, 'task').mockResolvedValue(existingTask);
      const task = await taskController.getTaskById(existingId);
      expect(task).toEqual(existingTask);
    });
  });

  describe('createTask', () => {
    it('should create a task', async () => {
      const taskData: TaskDataDto = {
        title: 'New Task',
        description: 'A new task to be done',
        dueDate: dayjs().toISOString(),
        status: TaskStatus.New,
      };
      const returnedTask = {
        ...taskData,
        id: 11,
        userId: null,
      }
      jest.spyOn(TaskService.prototype, 'createTask').mockResolvedValue(returnedTask);
      const created = await taskController.createTask(taskData);
      expect(created).toEqual(returnedTask);
    });
  });

  describe('updateTask', () => {
    it ('should not update a task not found by id', async () => {
      const notFoundError = 'Record not found';
      jest.spyOn(TaskService.prototype, 'updateTask').mockRejectedValue(new Error(notFoundError));
      await expect(taskController.updateTask(existingId, existingTask))
        .rejects
        .toThrowError(notFoundError);
    });

    it('should update an existing task', async () => {
      const updatedTask = {
        ...existingTask,
        status: TaskStatus.Completed,
      };
      jest.spyOn(TaskService.prototype, 'updateTask').mockResolvedValue(updatedTask);
      const updated = await taskController.updateTask(existingId, updatedTask);
      expect(updated).toEqual(updatedTask);
    });
  });

  describe('deleteTask', () => {
    it('should not delete an unfound task', async () => {
      const notFoundError = 'Record not found';
      jest.spyOn(TaskService.prototype, 'deleteTask').mockRejectedValue(new Error(notFoundError));
      await expect(taskController.deleteTask(existingId))
        .rejects
        .toThrowError(notFoundError);
    });

    it('should delete an existing task', async () => {
      jest.spyOn(TaskService.prototype, 'deleteTask').mockResolvedValue(existingTask);
      const deleted = await taskController.deleteTask(existingId);
      expect(deleted).toEqual(existingTask);
    });
  });
});
