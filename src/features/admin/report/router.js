export const reportRoutes = [
    {
        path: '/report/check/:id',
        name: 'ReportDetail',
        component : () => import('@/features/admin/report/views/ReportDetailView.vue')
    }
]