import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const getNewsList = (params) => {
    return api.get('/admin/news', { params })
}

// 뉴스 상세 정보를 가져오는 함수
export const getNewsDetail = async (id) => {
    try {
        const response = await api.get(`/admin/news/${id}`);
        return response.data;  // 이미 response.data는 필요한 데이터를 포함하고 있으므로 바로 반환
    } catch (error) {
        console.error('뉴스 조회 실패:', error);
        throw error;  // 오류를 처리하거나 상위 컴포넌트로 던짐
    }
};
// 뉴스 수정 API 호출
export const updateNews = async (id, payload) => {
    try {
        const response = await api.put(`/admin/news/${id}`, payload);
        return response.data;
    } catch (error) {
        console.error('뉴스 수정 실패:', error);
        throw error;  // 오류를 처리하거나 상위 컴포넌트로 던짐
    }
};

// 뉴스 발송 API 호출
export const sendNews = async (id) => {
    try {
        const response = await api.post(`/admin/send/${id}`);
        return response.data;
    } catch (error) {
        console.error('뉴스 발송 실패:', error);
        throw error;  // 오류를 처리하거나 상위 컴포넌트로 던짐
    }
};

// 뉴스 삭제 API 호출
export const deleteNews = async (id) => {
    try {
        const response = await api.delete(`/admin/news/${id}`);
        return response.data;
    } catch (error) {
        console.error('뉴스 삭제 실패:', error);
        throw error;  // 오류를 처리하거나 상위 컴포넌트로 던짐
    }
};

// 뉴스 저장 API 호출
export const saveNews = async (payload) => {
    try {
        const response = await api.post('/admin/news', payload);
        return response.data;  // API에서 반환하는 데이터를 그대로 반환
    } catch (error) {
        console.error('뉴스 저장 실패:', error);
        throw error;  // 오류를 처리하거나 상위 컴포넌트로 던짐
    }
};