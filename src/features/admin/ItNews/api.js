import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export const getNewsList = (params) => {
    return api.get('/admin/news', { params })
}