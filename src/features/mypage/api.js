import api from "@/api/axios.js";

export function userInfo() {
    return api.get ('/mypage/info');
}