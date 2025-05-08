import api from "@/api/axios.js";

export function fetchCommentList(postId) {
    return api.get(`/board/${postId}/comments`);
}

export function saveComment({ postId, parentCommentId = null, contents }) {
    return api.post('/comments', {
        boardId:postId,
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


//  댓글 좋아요 여부 확인
export const hasUserLikedComment = (commentId) => {
    return api.get(`/comment/${commentId}/like`);
};

// 댓글 좋아요 개수 조회
export const countLikesByCommentId = (commentId) => {
    return api.get(`/comment/${commentId}/like/count`);
};

// 댓글 좋아요
export function likeComment(commentId) {
    return api.post('/like', {
        boardId: null,
        commentId: commentId
    })
}

// 댓글 좋아요 취소
export function unlikeComment(commentId) {
    return api.delete('/like', {
        data: {
            boardId: null,
            commentId: commentId
        }
    })
}
