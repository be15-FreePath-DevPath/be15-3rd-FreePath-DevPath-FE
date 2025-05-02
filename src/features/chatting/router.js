import ChattingView from "@/features/chatting/views/ChattingView.vue";
import ChattingPendingView from "@/features/chatting/views/ChattingPendingView.vue";


export const chattingRoutes = [
    {
        path: "/chatting",
        name: "chatting",
        component: ChattingView
    },
    {
        path: "/chatting/pending",
        name: "chattingPending",
        component: ChattingPendingView
    },

]