import { createRouter, createWebHistory } from 'vue-router'
import TaskListViewVue from '@/views/TaskListView.vue'
import TaskDetailViewVue from '@/views/TaskDetailView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'tasks',
      component: TaskListViewVue
    },
    {
      path: '/tasks/:id',
      name: 'tasks-detail',
      component: TaskDetailViewVue
    },
    {
      path: '/tasks',
      name: 'tasks-create',
      component: TaskDetailViewVue
    },
  ]
})

export default router
