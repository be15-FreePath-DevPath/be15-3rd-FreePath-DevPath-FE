import api from "@/api/axios.js";

// 내가 쓴 댓글 목록 조회
export const getMyCommentList = (params) => {
    return api.get('/my-comments', { params });
};

// 내가 쓴 신고된 댓글 목록 조회
export const getMyReportedCommentList = (params) => {
    return api.get('/my-reported-comments', { params });
};
