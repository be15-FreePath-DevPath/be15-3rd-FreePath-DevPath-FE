import CSQuizWriteView from '@/features/admin/csquiz/views/CSQuizWriteView.vue'
import AdminMainView from "@/features/admin/AdminMainView.vue";


export const adminRoutes = [
    {
        path: '/admin',
        name: 'AdminMain',
        component: AdminMainView
    },
    // CS 퀴즈 작성
    {
        path: '/admin/csquiz/write',
        name: 'AdminCsQuizWrite',
        component: CSQuizWriteView
    }
]
