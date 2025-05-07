import api from "@/api/axios.js";

// CS 퀴즈 주간 퀴즈 조회
export const getWeeklyCsQuiz = () => api.get('/csquiz/weekly');

// CS 퀴즈 사용자 답변 저장
export const submitWeeklyCsQuiz = (payload) => {
    return api.post('/csquiz/submit', payload)
}

// CS 퀴즈 결과 조회
export const getUserCsQuizResult = () => {
    return api.get('/csquiz/result');
};
