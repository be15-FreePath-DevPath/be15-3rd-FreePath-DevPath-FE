import api from '@/api/axios.js'

export function saveDevtiResult(resultType) {
    return api.post('/user/dev-mbti', {
        devMbti: resultType
    });
}

export function fetchDevtiResult() {
    return api.get('/mypage/info');
}
