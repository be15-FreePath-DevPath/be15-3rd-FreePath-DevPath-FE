import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

api.interceptors.request.use(config => {
    const token = `eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxIiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzQ2MzU1NzcwLCJleHAiOjE3NDYzNzM3NzB9.ZG6WcUf1DPtIrza8No5NYS_oFSja00zP_KszAvfIHdrP7ZoBmqvYV3jvQXNvSsSkVzQNI61hcrvjm6-59URC7Q`
    config.headers.Authorization = `Bearer ${token}`
    return config
})

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
