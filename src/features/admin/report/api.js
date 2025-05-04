import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const getReportList = async () => {
    const response = await api.get('/report/check');
    return response.data;
};

export const getReportDetail = async (reportId) => {
    const response = await api.get(`/admin/reports/${reportId}`);
    return response.data;
};

export const processReportCheck = async (reportId, formData) => {
    const response = await api.post(`/admin/reports/check/${reportId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
};