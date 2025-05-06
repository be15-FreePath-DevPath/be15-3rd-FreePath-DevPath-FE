import api from "@/api/axios.js";

export function fetchPostList(params) {
    return api.get('/board/search', { params });
}

export function fetchPostDetail(postId) {
    return api.get(`/board/${postId}`);
}

export function createPost({ boardCategory, boardTitle, boardContents, vote = null, files = [] }) {
    const formData = new FormData();

    // JSON 객체를 Blob으로 감싸서 multipart의 text 파트로 보냄
    const postCreateRequest = {
        boardCategory,
        boardTitle,
        boardContents,
        vote, // null이거나 실제 vote 객체
    };

    formData.append(
        'postCreateRequest',
        new Blob([JSON.stringify(postCreateRequest)], { type: 'application/json' })
    );

    const allowedExtensions = ['gif', 'jpg', 'jpeg', 'png', 'bmp'];

    files.forEach(file => {
        const extension = file.name.split('.').pop().toLowerCase();

        if (!allowedExtensions.includes(extension)) {
            throw new Error('gif, jpg, jpeg, png, bmp 확장자만 업로드할 수 있습니다.');
        }

        formData.append('files', file);
    });

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

