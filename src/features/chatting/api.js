import api from '@/api/axios.js'


export const getChatting = chattingRoomId => api.get(`/chatting/list/${chattingRoomId}`);

export const getChattingRoomList = () => api.get('/chatting/list');

export const getChattingPendingList = () => api.get('/chatting/waitingChattingRoom');

export const getUserBlocked = () => api.get('/chatting/block');

export const deleteBlockUser = (userId) => api.delete(`/chatting/block/${userId}`);

export const getChattingRoomJoinUsers = (chattingRoomId) => api.get(`/chatting/list/${chattingRoomId}/users`)

export const getWaitingRoom = (chattingRoomId) => api.get(`/chatting/waitingRoom/${chattingRoomId}`);