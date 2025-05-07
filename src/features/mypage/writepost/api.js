import api from "@/api/axios.js";

export const getMyPostList = (params) => {
    return api.get('/board/mypage', { params })
}