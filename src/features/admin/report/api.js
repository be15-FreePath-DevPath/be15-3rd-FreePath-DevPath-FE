// 공통 axios 인스턴스 사용 (토큰, 쿠키, 인터셉터 포함)
import api from "@/api/axios.js";

// 신고 목록 조회
export const getReportList = async () => {
    try {
        const response = await api.get('/report/check');
        return response.data;
    } catch (error) {
        console.error('신고 목록 조회 실패:', error);
        throw error;
    }
};

// 신고 반려/삭제 처리
export const processReportCheck = async (reportCheckId, formData) => {
    try {
        const response = await api.post(`/report/check/${reportCheckId}`, formData);
        return response.data;
    } catch (error) {
        console.error('신고 처리 실패:', error);
        throw error;
    }
};
