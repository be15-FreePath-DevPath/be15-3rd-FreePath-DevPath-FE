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

export function signupTemp({ email, loginId, password, nickname, userName, itNewsSubscription, loginMethod }) {
    return api.post('/user/signup/temp', {
        email,
        loginId,
        password,
        nickname,
        userName,
        itNewsSubscription,
        loginMethod
    });
}

export function signupGoogleTemp() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiBaseUrl) {
        window.location.href = `${apiBaseUrl}/oauth2/authorization/google`;
    } else {
        console.error("API Base URL is not defined.");
    }
}

export function signupGoogle(email, nickname, itNewsSubscription){
    return api.post('/user/signup-social', {
        email,
        nickname,
        itNewsSubscription
    });
}

export function emailCheck(email, authNum, purpose){
    return api.post('/user/email/check', {
        email,
        authNum,
        purpose
    });
}

export function signupUser(email) {
    return api.post('/user/signup', {
        email
    });
}

export function loginGoogle() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    if (apiBaseUrl) {
        window.location.href = `${apiBaseUrl}/oauth2/authorization/google`;
    } else {
        console.error("API Base URL is not defined.");
    }
}

export async function deleteUser(email) {
    return await api.delete('/user', {
        data: { email }
    });
}

export async function findLoginId(email) {
    console.log('findLoginId 요청 보냄:', email);
    return await api.post('/user/find-id', {
        email
    });
}
