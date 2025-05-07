import MyPageView from "@/features/mypage/views/MyPageView.vue";
import MyPageEditView from "@/features/mypage/views/MyPageEditView.vue";

export const mypageRoutes = [
    {
        path: '/mypage/info',
        name: 'MyPage',
        component: MyPageView
    },
    {
        path: '/mypage/edit',
        name: 'MyPageEdit',
        component: MyPageEditView
    }
];
