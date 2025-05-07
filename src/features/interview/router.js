import InterviewListView from './views/InterviewListView.vue';
import InterviewDetailView from "@/features/interview/views/InterviewDetailView.vue";
import InterviewRunView from "@/features/interview/views/InterviewRunView.vue";
import InterviewProgressView from "@/features/interview/views/InterviewProgressView.vue";

export const interviewRoutes = [
    {
        path: '/interview/list',
        name: 'InterviewList',
        component: InterviewListView
    },
    {
        path: '/interview/:interviewRoomId',
        name: 'InterviewDetail',
        component: InterviewDetailView,
        props: true
    },
    {
        path: '/interview/run',
        name: 'InterviewRun',
        component: InterviewRunView
    },
    {
        path: '/interview/progress/:id',
        name: 'InterviewProgress',
        component: InterviewProgressView,
        props: true
    }
];
