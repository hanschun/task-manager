import { beforeAll, describe, expect, test } from 'vitest'
import { TaskService, type TaskData, TaskStatus } from './TaskService';
import dayjs from 'dayjs';
import nock from 'nock';
import type { Task } from '@prisma/client';

describe('Task Service', () => {
    let taskService: TaskService;

    beforeAll(() => {
        taskService = new TaskService();
    });
    
    const taskData: TaskData = {
        title: 'New Task',
        description: 'A new task to be done',
        dueDate: dayjs().toISOString(),
        status: TaskStatus.New,
    };

    test('it should getTasks', async () => {
        const scope = nock(taskService.baseRoute)
        .get('')
        .reply(200, [])
        const tasks = await taskService.getTasks();
        expect(tasks).toEqual([]);
    });

    test('getTaskById should return empty string if task does not exist', async () => {
        const id = '1' 
        const scope = nock(taskService.baseRoute)
          .get(`/${id}`)
          .reply(200, '')
        const task = await taskService.getTaskById(id);
        expect(task).toBe('');
        scope.isDone();
    });

    test('createTask should create a new task', async () => {
        const returnedTask: Task = {
            ...taskData,
            id: 1,
            userId: null,
        }
        const scope = nock(taskService.baseRoute)
          .post('')
          .reply(201,returnedTask)
        const task = await taskService.createTask(taskData)
        expect(task).toEqual(returnedTask);
        scope.isDone();
    });

    test('updateTask should update a new task', async () => {
        const taskId = '2';
        const returnedTask: Task = {
            ...taskData,
            id: Number(taskId),
            userId: null,
        }
        const scope = nock(taskService.baseRoute)
          .put(`/${taskId}`)
          .reply(200, returnedTask)
        const task = await taskService.updateTask(taskId, taskData)
        expect(task).toEqual(returnedTask);
        scope.isDone();
    });

    test('deleteTask should delete an existing task', async () => {
        const taskId = '3';
        const returnedTask: Task = {
            ...taskData,
            id: Number(taskId),
            userId: null,
        }
        const scope = nock(taskService.baseRoute)
          .delete(`/${taskId}`)
          .reply(200, returnedTask)
        const task = await taskService.deleteTask(taskId)
        expect(task).toEqual(returnedTask);
        scope.isDone();
    });
});