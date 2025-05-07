import CsQuizWriteView from './views/CsQuizWriteView.vue'
import CsQuizDetailView from './views/CsQuizDetailView.vue'

export const adminCsQuizRoutes = [
    {
        path: '/admin/csquiz/write',
        name: 'AdminCsQuizWrite',
        component: CsQuizWriteView,
        meta: { requiresAdmin: true }
    },
    {
        path: '/admin/csquiz/:csquizId',
        name: 'AdminCsQuizDetail',
        component: CsQuizDetailView,
        meta: { requiresAdmin: true }
    }
]
