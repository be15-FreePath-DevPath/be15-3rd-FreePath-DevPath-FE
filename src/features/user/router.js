import UserSignUpView from "@/features/user/views/UserSignUpView.vue";
import UserSignUpGeneralView from "@/features/user/views/UserSignUpGeneralView.vue";
import UserSignUpGoogleView from "@/features/user/views/UserSignUpGoogleView.vue";

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
    }
]