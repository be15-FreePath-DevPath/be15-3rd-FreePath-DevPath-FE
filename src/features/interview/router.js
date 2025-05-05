import InterviewListView from './views/InterviewListView.vue';
import InterviewDetailView from "@/features/interview/views/InterviewDetailView.vue";
import InterviewRunView from "@/features/interview/views/InterviewRunView.vue";

export const interviewRoutes = [
    {
        path: '/interview/list',
        name: 'InterviewList',
        component: InterviewListView
    },
    {
        path: '/interview/:id',
        name: 'InterviewDetailView',
        component: InterviewDetailView,
        props: true
    },
    {
        path: '/interview/run',
        name: 'InterviewRun',
        component: InterviewRunView
    }
];
