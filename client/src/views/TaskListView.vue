<script lang="ts">
import { taskService } from '../services/TaskService'
import type { Task } from '@prisma/client';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { TaskStatus } from '../services/TaskService';
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
dayjs.extend(relativeTime);

interface TaskView extends Task {
    completed?: boolean;
    displayDate?: string;
}

function transformTask(task: Task): TaskView {
    return {
        ...task,
        displayDate: dayjs(task.dueDate).format('MM/DD/YYYY'),
        completed: task.status === TaskStatus.Completed,
    };
}

export default defineComponent({
    setup() {
        const router = useRouter();
        return { router };
    },
    data: () => ({
        tasks: [] as TaskView[],
    }),
    emits: [],

    created() {
        this.fetchTasks();
    },

    methods: {
        async fetchTasks() {
            const fetchedTasks = await taskService.getTasks();
            const transformedTasks = [];
            for (const task of fetchedTasks) {
                const transformed = transformTask(task);
                transformedTasks.push(transformed);
            }
            this.tasks = transformedTasks;
        },
        async updateTask(id: number) {
            const index = this.tasks.findIndex(t => t.id === id);
            const task = this.tasks[index];
            if (!task) {
                return;
            }
            const updated = {
                status: task?.completed ? TaskStatus.New : TaskStatus.Completed,
                title: task.title,
                description: task.description,
                dueDate: task.dueDate,
            };
            const returned = await taskService.updateTask(String(id), updated);
            const transformed = transformTask(returned);
            this.tasks[index] = transformed;
        },
        goToTask(id: number) {
            this.router.push({ path: `/tasks/${id}`});
        },
        newTask() {
            this.router.push({ path: `/tasks`});
        }
    }
})
</script>

<template>
    <header>
        <h1 class="text-center">Task Manager</h1>
    </header>
    <main>
        <v-container>
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-list lines="three" select-strategy="classic">
                        <v-list-item
                            v-for="task in tasks"
                            value="{{task.id}}"
                            @click="goToTask(task.id)"
                        >
                            <template v-slot:prepend="{ isActive }">
                                <v-list-item-action start>
                                    <v-checkbox-btn color="white" :model-value="task.completed" @click.stop="updateTask(task.id)">
                                    </v-checkbox-btn>
                                </v-list-item-action>
                            </template>

                            <v-list-item-title>{{ task.title }}</v-list-item-title>

                            <v-list-item-subtitle>
                            {{ task.displayDate }}
                            </v-list-item-subtitle>
                            {{ task.description }}
                    </v-list-item>
                    </v-list>
                </v-col>
            </v-row>
            <v-row>
                <v-col
                    cols="12"
                >
                    <v-btn block class="mt-2" @click.stop="newTask()">New Task</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </main>
</template>
