import MyPageView from "@/features/mypage/views/MyPageView.vue";
import MyPageEdit from "@/features/mypage/views/MyPageEdit.vue";

export const mypageRoutes = [
    {
        path: '/mypage/info',
        name: 'MyPage',
        component: MyPageView
    },
    {
        path: '/mypage/edit',
        name: 'MyPageEdit',
        component: MyPageEdit
    }
];
