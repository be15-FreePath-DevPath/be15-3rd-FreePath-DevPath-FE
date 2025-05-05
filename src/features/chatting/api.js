import axios from "axios";

const api = axios.create({
    baseURL : 'http://localhost:8080'
});


export const getChatting = chattingRoomId => api.get(`/chatting/list/${chattingRoomId}`);

export const getChattingRoomList = () => api.get('/chatting/list');

export const getChattingPendingList = () => api.get('/chatting/waitingChattingRoom');