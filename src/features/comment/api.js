import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:8080"
});

export function fetchCommentList(postId) {
    return api.get(`/board/${postId}/comments`);
}

export function saveComment({ postId, parentCommentId = null, contents }) {
    return api.post('/comments', {
        postId,
        parentCommentId,
        contents
    });
}

export function deleteComment(commentId) {
    return api.delete(`/comments/${commentId}`);
}

export function updateComment(commentId, contents) {
    return api.put(`/comments/${commentId}`, {contents});
}

export function reportComment(commentId) {
    return api.post(`/report/comment/${commentId}`)
}