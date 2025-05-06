import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});
api.interceptors.request.use(config => {
    const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQ2NTIwOTE2LCJleHAiOjE3NDY1Mzg5MTZ9.JJ9M_TzNfKLtVTv13bsYJmVyklctZ6mziCXI4Q9fpF0WMB5kyHSbFR5I-ZzAHHdaEM4lta1kxzaY7wYHcSQTxw`;
    // const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQ2MzYyOTA2LCJleHAiOjE3NDYzODA5MDZ9.7-F3vIjHwouA1CzqtQk8aWcgSGj8ztIKPR610S95y8bSTi77kPRtnySP0TO38cJ4xQvzNGZXThrrtNYgE0VQKw`;

    config.headers.Authorization = `Bearer ${token}`;
    return config;
});
// 좋아요한 게시글 목록 조회
export const getLikedList = (params) => {
    return api.get('/mypage/like', { params });
};