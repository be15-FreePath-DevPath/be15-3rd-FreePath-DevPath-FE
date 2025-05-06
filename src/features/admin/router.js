import AdminMainView from "@/features/admin/AdminMainView.vue";
import CsQuizWriteView from "@/features/admin/csquiz/views/CsQuizWriteView.vue";
import CsQuizDetailView from "@/features/admin/csquiz/views/CsQuizDetailView.vue";
import ReportDetailView from "@/features/admin/report/views/ReportDetailView.vue";


export const adminRoutes = [
    {
        path: '/admin',
        name: 'AdminMain',
        component: AdminMainView,
        meta: { requiresAdmin: true }
    },
    {
        path: '/report/check/:id',  // 경로 추가
        name: 'ReportDetail',
        component: ReportDetailView,  // 해당 컴포넌트를 라우트에 연결
        meta: { requiresAdmin: true }
    }
]
