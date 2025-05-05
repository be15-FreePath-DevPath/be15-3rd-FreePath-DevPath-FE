import DevtiIntroView from "@/features/devti/views/DevtiIntroView.vue";
import DevtiTestView from "@/features/devti/views/DevtiTestView.vue";

export const devtiRoutes = [
    {
        path: '/mypage/devti/solve',
        name: 'DevtiIntro',
        component: DevtiIntroView
    },
    {
        path: '/mypage/devti/test',
        name: 'DevtiTest',
        component: DevtiTestView
    }
];
