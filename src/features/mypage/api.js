import api from "@/api/axios.js";

export function userInfo() {
    return api.get ('/mypage/info');
}

export function modifyUserInfo(nickname, itNewsSubscription){
    return api.put('/user/info', {
            nickname,
            itNewsSubscription
    });
}

export function verifyEmail(data) {
    return api.post('/user/verify-email', data)
}

export function changeEmail(data) {
    return api.post('/user/change-email', data);
}

export function changePassword(data) {
    return api.post('/user/change-password', data)
}