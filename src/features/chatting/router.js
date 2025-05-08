import ChattingView from "@/features/chatting/views/ChattingView.vue";
import ChattingPendingView from "@/features/chatting/views/ChattingPendingView.vue";
import UserBlockView from "@/features/chatting/views/UserBlockView.vue";


export const chattingRoutes = [
    {
        path: "/chatting",
        name: "chatting",
        component: ChattingView,
        meta : { requiresAuth : true }
    },
    {
        path: "/chatting/pending",
        name: "chattingPending",
        component: ChattingPendingView,
        meta : { requiresAuth : true }
    },
    {
        path: "/mypage/block",
        name: "userBlock",
        component: UserBlockView
    },

]