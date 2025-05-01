import AdminMainView from "@/features/admin/AdminMainView.vue";
import CsQuizWriteView from "@/features/admin/csquiz/views/CsQuizWriteView.vue";
import CsQuizDetailView from "@/features/admin/csquiz/views/CsQuizDetailView.vue";


export const adminRoutes = [
    {
        path: '/admin',
        name: 'AdminMain',
        component: AdminMainView
    },
    {
        path: '/admin/csquiz/write',
        name: 'AdminCsQuizWrite',
        component: CsQuizWriteView
    },
    {
        path: '/admin/csquiz/:csquizId',
        name: 'AdminCsQuizDetail',
        component: CsQuizDetailView
    }
]
