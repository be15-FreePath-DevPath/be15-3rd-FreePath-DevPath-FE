import api from "@/api/axios.js";

export function loginUser(data) {
    return api.post('/user/login', data);
}

export function refreshUserToken() {
    return api.post(`/user/refresh`);
}

export function logoutUser() {
    return api.post(`/user/logout`);
}

export function signupTemp({ email, loginId, password, nickname, name, itNewsSubscription }) {
    return api.post('/user/signup/temp', {
        email,
        loginId,
        password,
        nickname,
        name,
        itNewsSubscription
    });
}