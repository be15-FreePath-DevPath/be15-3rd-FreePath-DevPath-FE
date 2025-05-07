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

export function changeEmail(currentEmail, newEmail) {
    return api.post('user/change-email', {
        currentEmail,
        newEmail
    });
}