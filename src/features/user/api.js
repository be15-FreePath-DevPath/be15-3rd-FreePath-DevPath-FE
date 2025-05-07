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

export function signupGoogle() {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    console.log("VITE_API_BASE_URL:", apiBaseUrl);
    if (apiBaseUrl) {
        window.location.href = `${apiBaseUrl}/oauth2/authorization/google`;
    } else {
        console.error("API Base URL is not defined.");
    }
}

