import api from "@/api/axios.js";


// 북마크한 게시글 목록 조회
export const getBookmarkList = (params) => {
    return api.get('/mypage/bookmark', { params });
};