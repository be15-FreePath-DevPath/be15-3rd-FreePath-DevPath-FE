import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router'
import { interviewRoutes } from '@/features/interview/router.js'
import { csquizRoutes } from "@/features/csquiz/router.js";
import {adminRoutes} from "@/features/admin/router.js";
import {chattingRoutes} from "@/features/chatting/router.js";
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import {itNewsRoutes} from "@/features/admin/ItNews/router.js";
import {boardRoutes} from "@/features/board/router.js";
import {userRoutes} from "@/features/user/router.js";
import {adminCsQuizRoutes} from "@/features/admin/csquiz/router.js";
import {mypageRoutes} from "@/features/mypage/router.js";
import {devtiRoutes} from '@/features/devti/router.js'
import {useAuthStore} from "@/stores/auth.js";
import { useToast } from 'vue-toastification'

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
                ...boardRoutes,
                ...chattingRoutes,
                ...userRoutes,
                ...adminCsQuizRoutes,
                ...mypageRoutes,
                ...devtiRoutes,
            ]
        }
    ]
})

// OAuth 로그인 직후 URL에서 accessToken 저장
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()

    // URL에 accessToken이 있다면 저장하고 URL에서 제거
    if (to.query.accessToken) {
        authStore.setAuth(to.query.accessToken)

        // 쿼리 파라미터 없이 깔끔하게 리디렉트
        return next({ path: to.path, query: {} })
    }

    next()
})

// 관리자 페이지 접근 시
router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const toast = useToast()

    if (to.meta.requiresAdmin) {
        if (!authStore.isAuthenticated || authStore.userRole !== 'ADMIN') {
            toast.warning('관리자만 접근할 수 있습니다.', {
                position: 'top-center'
            })
            return next('/')
        }
    }

    next()
})

export default router
