import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router'
import { interviewRoutes } from '@/features/interview/router.js'
import { csquizRoutes } from "@/features/csquiz/router.js";
import {adminRoutes} from "@/features/admin/router.js";
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import {itNewsRoutes} from "@/features/admin/ItNews/router.js";
import {boardRoutes} from "@/features/board/router.js";

const router = createRouter({
    history: createWebHistory(),
    routes:[
        {
            path:'/',
            component: LayoutDefault,
            children: [
                ...mainRoutes,
                ...interviewRoutes,
                ...csquizRoutes,
                ...adminRoutes,
                ...itNewsRoutes,
                ...boardRoutes
            ]
        }
    ]
})

export default router
