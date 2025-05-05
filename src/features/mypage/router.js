import MyPageView from '@/features/mypage/views/MyPageView.vue';
import MyPage2View from "@/features/mypage/views/MyPage2View.vue";
import MyPageEdit from "@/features/mypage/views/MyPageEdit.vue";

export const mypageRoutes = [
    {
        path: '/mypage',
        name: 'MyPage',
        component: MyPageView
    },
    {
        path: '/mypage/info',
        name: 'MyPage2',
        component: MyPage2View
    },
    {
        path: '/mypage/edit',
        name: 'MyPageEdit',
        component: MyPageEdit
    }
];
