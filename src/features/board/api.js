import api from "@/api/axios.js";

export function fetchPostList(params) {
    return api.get('/board/search', { params });
}

export function fetchPostDetail(postId) {
    return api.get(`/board/${postId}`);
}

export function createPost({
                               boardCategory,
                               boardTitle,
                               boardContents,
                               vote = null,
                               usedImageUrls = [],
                           }) {
    const formData = new FormData();

    const postCreateRequest = {
        boardCategory,
        boardTitle,
        boardContents,
        vote,
        usedImageUrls, // 서버에서 이 URL들로 이미지 처리
    };

    formData.append(
        'postCreateRequest',
        new Blob([JSON.stringify(postCreateRequest)], {
            type: 'application/json',
        })
    );

    return api.post('/board', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}


export function uploadTempImage(imageFile) {
    const formData = new FormData();
    formData.append('image', imageFile);

    return api.post('/board/image/temp', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export function deletePost(postId) {
    return api.delete(`/board/${postId}`);
}

export function updatePost(postId, { title, content }) {
    return api.put(`/board/${postId}`, {
        title,
        content
    });
}

export function reportPost(postId) {
    return api.post(`/report/board/${postId}`);
}

