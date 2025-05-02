import CsQuizMainView from "@/features/csquiz/views/CsQuizMainView.vue";
import TakeCsQuizView from "@/features/csquiz/views/TakeCsQuizView.vue";
import CsQuizResultView from "@/features/csquiz/views/CsQuizResultView.vue";

export const csquizRoutes = [
    {
        path: "/csquiz",
        name: "CsquizMain",
        component: CsQuizMainView
    },
    {
        path: "/csquiz/take",
        name: "TakeCsQuizView",
        component: TakeCsQuizView
    },
    {
        path: "/csquiz/result",
        name: "CsQuizResultView",
        component: CsQuizResultView
    }
]
