export const itNewsRoutes = [
    {
        path: '/admin/news/:id',
        name: 'NewsDetail',
        component : () => import('@/features/admin/ItNews/views/NewsDetailView.vue'),
        meta: { requiresAdmin: true }
    },
    {
        path: '/admin/news/write',
        name: 'NewsDetailWrite',
        component : () => import('@/features/admin/ItNews/views/NewsWriteView.vue'),
        meta: { requiresAdmin: true }
    }
]