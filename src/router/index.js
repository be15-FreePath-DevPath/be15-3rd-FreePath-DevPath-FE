import { createRouter, createWebHistory } from 'vue-router'
import { csquizRoutes } from "@/features/csquiz/router.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
      ...csquizRoutes
  ]
})

export default router
