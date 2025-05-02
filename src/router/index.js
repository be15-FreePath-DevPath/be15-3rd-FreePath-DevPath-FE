import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router'
import interviewRoutes from '@/features/interview/router.js'
import { csquizRoutes } from "@/features/csquiz/router.js";
import {adminRoutes} from "@/features/admin/router.js";
import {chattingRoutes} from "@/features/chatting/router.js"

const router = createRouter({
  history: createWebHistory(),
  routes: [
      ...mainRoutes,
      ...interviewRoutes,
      ...csquizRoutes,
      ...adminRoutes,
      ...chattingRoutes
  ]
})

export default router
