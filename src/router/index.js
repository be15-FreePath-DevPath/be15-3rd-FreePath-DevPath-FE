import { createRouter, createWebHistory } from 'vue-router'
import { csquizRoutes } from "@/features/csquiz/router.js";
import {adminRoutes} from "@/features/admin/router.js";

const router = createRouter({
  history: createWebHistory(),
  routes: [
      ...csquizRoutes,
      ...adminRoutes
  ]
})

export default router
