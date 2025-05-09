import UserSignUpView from "@/features/user/views/UserSignUpView.vue";
import UserSignUpGeneralView from "@/features/user/views/UserSignUpGeneralView.vue";
import UserSignUpGoogleView from "@/features/user/views/UserSignUpGoogleView.vue";
import UserLoginView from "@/features/user/views/UserLoginView.vue";
import UserLoginGeneralView from "@/features/user/views/UserLoginGeneralView.vue";
import UserResetPwView from "@/features/user/views/UserResetPwView.vue";
import UserDeleteView from "@/features/user/views/UserDeleteView.vue";
import UserFindLoginIdView from "@/features/user/views/UserFindLoginIdView.vue";

export const userRoutes = [
    {
        path: "/user/signup",
        name: "UserSignUp",
        component: UserSignUpView
    },
    {
        path: "/user/signup/general",
        name: "UserSignUpGeneral",
        component: UserSignUpGeneralView
    },
    {
        path: "/user/signup/google",
        name: "UserSignUpGoogle",
        component: UserSignUpGoogleView
    },
    {
        path: "/user/login",
        name: "UserLogin",
        component: UserLoginView
    },
    {
        path: "/user/login/general",
        name: "UserLoginGeneral",
        component: UserLoginGeneralView
    },
    {
        path: "/user/findLoginId",
        name: "UserFindLoginId",
        component: UserFindLoginIdView
    },
    {
        path: "/user/resetPw",
        name: "UserResetPw",
        component: UserResetPwView
    },
    {
        path: '/oauth2/success',
        name: 'Oauth2Success',
        component: () => import('@/features/user/views/Oauth2SuccessView.vue')
    },
    {
        path: '/user/delete',
        name: "UserDelete",
        component: UserDeleteView
    }
]