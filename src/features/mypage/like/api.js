import api from "@/api/axios.js";


// 좋아요한 게시글 목록 조회
export const getLikedList = (params) => {
    return api.get('/mypage/like', { params });
};