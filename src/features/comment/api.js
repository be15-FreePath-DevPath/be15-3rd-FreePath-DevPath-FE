import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export function fetchCommentList(postId) {
    return api.get(`/board/${postId}/comments`);
}