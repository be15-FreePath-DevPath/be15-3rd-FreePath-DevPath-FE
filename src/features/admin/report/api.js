import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

// 신고 목록 조회
export const getReportList = async () => {
    const response = await api.get('/report/check');
    return response.data;
};

// 신고 반려/삭제 처리
export const processReportCheck = async (reportCheckId, formData) => {
    const response = await api.post(`/report/check/${reportCheckId}`, formData);
    return response.data;
};
