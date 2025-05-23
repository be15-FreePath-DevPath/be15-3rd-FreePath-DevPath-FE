export const boardRoutes = [
    {
        path: '/board/free',
        name: 'FreeBoard',
        component : () => import('@/features/board/views/FreeBoardListView.vue')
    },
    {
        path: '/board/job',
        name: 'JobBoard',
        component : () => import('@/features/board/views/JobBoardListView.vue')
    },
    {
        path: '/board/project',
        name: 'ProjectBoard',
        component : () => import('@/features/board/views/ProjectBoardListView.vue')
    },
    {
        path: `/board/:id`,
        name: 'PostDetail',
        component : () => import('@/features/board/views/PostDetailView.vue')
    },
    {
        path: 'board/write',
        name: 'PostWrite',
        component : () => import('@/features/board/views/PostWriteView.vue'),
        meta : { requiresAuth : true }
    },
    {
        path: 'board/edit/:id',
        name: 'PostEditView',
        component : () => import('@/features/board/views/PostEditView.vue'),
        meta : {requiresAuth: true }
    }
]