import type { Task } from "@prisma/client";
import axios from "axios";


export interface TaskData {
    title: string;
    description: string;
    dueDate: string;
    status: string;
}

export enum TaskStatus {
    New = 'New',
    Completed = 'Completed'
}

export class TaskService {
    baseRoute = 'http://localhost:3000/api/tasks';

    async getTasks(): Promise<Task[]> {
        const response = await axios.get(this.baseRoute);
        return response.data as Task[];
    }

    async getTaskById(id: string): Promise<Task> {
        const response = await axios.get(`${this.baseRoute}/${id}`);
        return response.data as Task;
    }

    async createTask(taskData: TaskData): Promise<Task> {
        const response = await axios.post(this.baseRoute, taskData);
        return response.data as Task;
    }

    async updateTask(id: string, taskData: TaskData): Promise<Task> {
        const response = await axios.put(`${this.baseRoute}/${id}`, taskData);
        return response.data as Task;
    }

    async deleteTask(id: string): Promise<Task> {
        const response = await axios.delete(`${this.baseRoute}/${id}`);
        return response.data as Task;
    }
}

export const taskService = new TaskService();