<script lang="ts">
import { taskService } from '@/services/TaskService';
import dayjs from 'dayjs';

export default {
    data: () => ({
        title: '',
        description: '',
        dueDate: '',
        status: 'New',
    }),
    emits: [],

    mounted() {
        if (this.$route.params.id) {
            this.fetchTask();
        }
    },
    methods: {
        async fetchTask() {
            const task = await taskService.getTaskById(this.$route.params.id);
            console.log(task);
            this.title = task.title;
            this.description = task.description;
            this.dueDate = dayjs(task.dueDate).format('YYYY-MM-DD');
            this.status = task.status;
        },

        async upsertTask() {
            const task = {
                title: this.title,
                description: this.description,
                dueDate: this.dueDate,
                status: this.status,
            };
            if (this.$route.params.id) {
                await taskService.updateTask(this.$route.params.id, task);
            } else {
                await taskService.createTask(task);
            }
            this.$router.push({ path: '/'});
        },

        async deleteTask() {
            await taskService.deleteTask(this.$route.params.id);
            this.$router.push({ path: '/'});
        }
    }
}
</script>

<template>
    <header>
        <h1 class="text-center">Task Manager</h1>   
    </header>
    <main>
        <v-form>
            <v-container>
                <v-row>
                    <v-col
                        cols="12"
                    >
                    <v-text-field
                        v-model="title"
                        label="Title"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                    >
                    <v-text-field
                        v-model="description"
                        label="Description"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                    >
                    <v-text-field
                        v-model="dueDate"
                        label="Due Date"
                        type="date"
                        required
                    ></v-text-field>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col
                        cols="12"
                    >
                        <v-radio-group v-model="status">
                            <template v-slot:label>
                                <div>Status</div>
                            </template>
                            <v-radio label="New" value="New"></v-radio>
                            <v-radio label="Completed" value="Completed"></v-radio>
                        </v-radio-group>
                    </v-col>
                </v-row>
            </v-container>
            <v-btn block class="mt-2" @click.stop="upsertTask()">Submit</v-btn>
            <v-btn block v-show="$route.params.id" class="mt-2" color="error" @click.stop="deleteTask()">Delete Task</v-btn>
            <v-btn block class="mt-2" color="warning" @click.stop="$router.back()">Cancel</v-btn>
        </v-form>
    </main>
</template>

<style></style>