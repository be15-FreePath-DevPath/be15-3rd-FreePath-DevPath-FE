import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});
api.interceptors.request.use(config => {
    // const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI0Iiwicm9sZSI6IlVTRVIiLCJpYXQiOjE3NDYzNjM4NjcsImV4cCI6MTc0NjM4MTg2N30.1YW7LVmaw2ZMTnqljIZm_P84RS5NCA_oX98iEpRvaRvgtBcth2ypoiSG7zw6w6UhuYhnvV6Smcg6iEVO8fF5lA`;
    const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQ2MzYyOTA2LCJleHAiOjE3NDYzODA5MDZ9.7-F3vIjHwouA1CzqtQk8aWcgSGj8ztIKPR610S95y8bSTi77kPRtnySP0TO38cJ4xQvzNGZXThrrtNYgE0VQKw`;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// 좋아요한 게시글 목록 조회
export const getLikedList = (params) => {
    return api.get('/mypage/like', { params });
};