import { createRouter, createWebHistory } from 'vue-router'
import mainRoutes from '@/features/main/router'
import { interviewRoutes } from '@/features/interview/router.js'
import { csquizRoutes } from "@/features/csquiz/router.js";
import { adminRoutes } from "@/features/admin/router.js";
import { chattingRoutes } from "@/features/chatting/router.js";
import LayoutDefault from "@/components/layout/LayoutDefault.vue";
import { itNewsRoutes } from "@/features/admin/ItNews/router.js";
import { boardRoutes } from "@/features/board/router.js";
import { userRoutes } from "@/features/user/router.js";
import { adminCsQuizRoutes } from "@/features/admin/csquiz/router.js";
import { mypageRoutes } from "@/features/mypage/router.js";
import { devtiRoutes } from '@/features/devti/router.js'
import { useAuthStore } from "@/stores/auth.js";
import { useToast } from 'vue-toastification'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
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
    ],

})

// 로그인이나 회원가입 시, RouterView 내부의 스크롤바를 맨 위로 설정
router.afterEach((to) => {
    const scrollToTopNames = [
        'UserLogin',
        'UserLoginGeneral',
        'UserSignUp',
        'UserSignUpGeneral',
        'UserSignUpGoogle'
    ];

    if (scrollToTopNames.includes(to.name)) {
        // Vue 앱이 렌더링된 후 DOM 접근해야 하므로 nextTick 사용
        setTimeout(() => {
            const el = document.querySelector('.main-content');
            if (el) el.scrollTop = 0;
        }, 0);
    }
});

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

// 비로그인 상태로 접근 시 차단하는 설정 -> requiresAuth를 meta에 기입하기
router.beforeEach(to => {

    const authStore = useAuthStore();
    // 인증이 되어야만 하는 페이지인데 인증이 되어 있지 않다면 로그인 페이지로 이동
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        return {
            name : 'UserLogin',
            query : { redirect : to.fullPath }
        }
    }

    // 로그인, 회원가입 페이지에 이미 로그인 된 상태로 접근하면 메인으로 이동
    if ((to.name === 'login' || to.name === 'register') && authStore.isAuthenticated) {
        return { name : 'main' }
    }
    // 그 외에는 그대로 라우팅 처리함
})

export default router
