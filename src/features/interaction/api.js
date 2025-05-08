import api from "@/api/axios.js"


// 게시글 좋아요 여부 확인
export const hasUserLikedBoard = (boardId) => {
    return api.get(`/board/${boardId}/like`)
}

// 게시글 좋아요 개수 조회
export const countLikesByBoardId = (boardId) => {
    return api.get(`/board/${boardId}/like/count`)
}

// 좋아요 등록 (게시글 또는 댓글)
export const like = (payload) => {
    return api.post('/like', payload)
}

// 좋아요 취소 (게시글 또는 댓글)
export const unlike = (payload) => {
    return api.delete('/like', { data: payload })
}


// 게시글 북마크 여부 확인
export const hasUserBookmarkedPost = (boardId) => {
    return api.get(`/board/${boardId}/bookmark`)
}

// 게시글 북마크 등록
export const bookmark = (payload) => {
    return api.post('/bookmark', payload)
}

// 게시글 북마크 취소
export const unbookmark = (payload) => {
    return api.delete('/bookmark', { data: payload })
}
