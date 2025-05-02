export const itNewsRoutes = [
    {
        path: '/admin/news/:id',
        name: 'NewsDetail',
        component : () => import('@/features/admin/ItNews/views/NewsDetailView.vue')
    },
    {
        path: '/admin/news/write',
        name: 'NewsDetailWrite',
        component : () => import('@/features/admin/ItNews/views/NewsWriteView.vue')
    }
]