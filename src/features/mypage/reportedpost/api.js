import api from "@/api/axios.js";

export const getMyReportedPostList = (params) => {
    return api.get('/board/mypage/reported-post', { params })
}