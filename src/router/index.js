import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router'
import interviewRoutes from '@/features/interview/router.js'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...mainRoutes,
    ...interviewRoutes,
  ]
})

export default router
