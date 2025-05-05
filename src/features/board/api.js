import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export function fetchPostList(params) {
    return api.get('/board/search', { params });
}

export function fetchPostDetail(postId) {
    return api.get(`/board/${postId}`);
}