import UserSignUpView from "@/features/user/views/UserSignUpView.vue";
import UserSignUpGeneralView from "@/features/user/views/UserSignUpGeneralView.vue";

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
    }
]