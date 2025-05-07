// 공통 axios 인스턴스를 사용합니다 (토큰, 쿠키, 인터셉터 포함)
import api from "@/api/axios.js";

// 뉴스 목록 조회
export const getNewsList = (params) => {
    return api.get('/admin/news', { params });
};

// 뉴스 상세 정보 조회
export const getNewsDetail = async (id) => {
    try {
        const response = await api.get(`/admin/news/${id}`);
        return response.data;
    } catch (error) {
        console.error('뉴스 조회 실패:', error);
        throw error;
    }
};

// 뉴스 수정
export const updateNews = async (id, payload) => {
    try {
        const response = await api.put(`/admin/news/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('뉴스 수정 실패:', error);
        throw error;
    }
};

// 뉴스 발송
export const sendNews = async (id) => {
    try {
        const response = await api.post(`/admin/send/${id}`);
        return response.data;
    } catch (error) {
        console.error('뉴스 발송 실패:', error);
        throw error;
    }
};

// 뉴스 삭제
export const deleteNews = async (id) => {
    try {
        const response = await api.delete(`/admin/news/${id}`);
        return response.data;
    } catch (error) {
        console.error('뉴스 삭제 실패:', error);
        throw error;
    }
};

// 뉴스 저장
export const saveNews = async (payload) => {
    try {
        const response = await api.post('/admin/news', payload);
        return response.data;
    } catch (error) {
        console.error('뉴스 저장 실패:', error);
        throw error;
    }
};
