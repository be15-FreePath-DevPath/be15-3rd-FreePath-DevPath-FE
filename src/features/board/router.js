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
]