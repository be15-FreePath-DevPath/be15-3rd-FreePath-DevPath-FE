// src/api/csquiz.js
import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

// 퀴즈 목록 조회
export const getAdminCsQuizList = (params) => {
    return api.get('/admin/csquiz/all', { params });
};

// 단건 조회
export const getAdminCsQuiz = (id) => {
    return api.get(`/admin/csquiz/${id}`);
};

// 퀴즈 등록
export const createAdminCsQuiz = (payload) => {
    return api.post('/admin/csquiz/quiz-add', payload);
};

// 퀴즈 수정
export const updateAdminCsQuiz = (id, payload) => {
    return api.put(`/admin/csquiz/modify/${id}`, payload);
};
