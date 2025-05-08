import api from "@/api/axios.js";

// 카테고리별 게시글 목록 조회
export function getPostsByCategory(categoryId) {
    return api.get(`/board/category/${categoryId}`);
}