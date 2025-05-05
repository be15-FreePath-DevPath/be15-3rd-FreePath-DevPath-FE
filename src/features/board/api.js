import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export function fetchPostList(params) {
    return api.get('/board/search', { params });
}