import MyPageView from '@/features/mypage/views/MyPageView.vue';
import MyPage2View from "@/features/mypage/views/MyPage2View.vue";

export const mypageRoutes = [
    {
        path: '/mypage',
        name: 'MyPage',
        component: MyPageView
    },
    {
        path: '/mypage2',
        name: 'MyPage2',
        component: MyPage2View
    }
];
